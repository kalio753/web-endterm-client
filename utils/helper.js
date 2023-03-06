function checkRecentDate(date) {
    var time_formats = [
        [60, "seconds", 1], // 60
        [120, "1 minute ago", "1 minute from now"], // 60*2
        [3600, "minutes", 60], // 60*60, 60
        [7200, "1 hour ago", "1 hour from now"], // 60*60*2
        [86400, "hours", 3600], // 60*60*24, 60*60
    ]

    let dateToCheck = date
    dateToCheck = new Date(dateToCheck)

    let now = new Date().toISOString()
    now = new Date(now)

    const diffTime = now.getTime() - dateToCheck.getTime()
    let res

    if (diffTime / (1000 * 60 * 60 * 24) >= 1)
        res = date.split("T")[0].split("-").reverse().join("/")
    else if (diffTime / (1000 * 60 * 60) >= 1) {
        res = Math.round(diffTime / (1000 * 60 * 60)) + " tiếng trước"
    } else if (diffTime / (1000 * 60) >= 1) {
        res = Math.round(diffTime / (1000 * 60)) + " phút trước"
    } else {
        res = Math.round(diffTime / 1000) + " giây trước"
    }
    return res
}

module.exports = {
    checkRecentDate,
}
