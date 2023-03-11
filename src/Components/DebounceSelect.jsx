import React, { useMemo, useRef, useState } from "react"
import { Select, Spin } from "antd"
import debounce from "lodash/debounce"
import FriendCard from "./FriendCard/FriendCard.jsx"

function DebounceSelect({ fetchOptions, debounceTimeout = 500, ...props }) {
    const [fetching, setFetching] = useState(false)
    const [options, setOptions] = useState([])
    const fetchRef = useRef(0)
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1
            const fetchId = fetchRef.current
            setOptions([])
            setFetching(true)
            fetchOptions(value).then((newOptions) => {
                console.log("value ne", value)
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return
                }
                console.log("newOptions ne ", newOptions)
                setOptions(newOptions)
                setFetching(false)
            })
        }
        return debounce(loadOptions, debounceTimeout)
    }, [fetchOptions, debounceTimeout])
    return (
        <Select
            // labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            className=""
            notFoundContent={fetching ? <Spin size="small" /> : null}
            options={options}
            placeholder="Search for friends..."
            {...props}
        />
    )
}

// Usage of DebounceSelect

export default DebounceSelect
