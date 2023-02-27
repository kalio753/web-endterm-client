import { useEffect, useState } from "react"
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes,
    Outlet
} from "react-router-dom"
import "./App.scss"
import "./Theme.scss"
import Header from "./Layout/Header/Header.jsx"
import About from "./Pages/About/About.jsx"
import Home from "./Pages/Home/Home.jsx"
import useLocalStorage from "use-local-storage"

function App() {
    const defaultDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches
    const [theme, setTheme] = useLocalStorage(
        "theme",
        defaultDark ? "dark" : "light"
    )

    // const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
    }
    // useEffect(() => {
    //     localStorage.setItem("theme", theme)
    //     document.body.className = theme
    // }, [theme])
    return (
        <div className="" data-theme={theme}>
            <Router>
                <Header toggleTheme={toggleTheme} theme={theme} />
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <button onClick={toggleTheme}>
                    Switch to {theme === "light" ? "dark" : "light"} theme
                </button>

                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home toggleTheme={toggleTheme} theme={theme} />
                        }
                    />
                    <Route path="about" element={<About />}>
                        {/* <Route path="ab" element={<Test />} /> */}
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App
