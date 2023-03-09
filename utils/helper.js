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
        res = Math.round(diffTime / (1000 * 60 * 60)) + "h"
    } else if (diffTime / (1000 * 60) >= 1) {
        res = Math.round(diffTime / (1000 * 60)) + "m"
    } else {
        res = Math.round(diffTime / 1000) + "s"
    }
    return res
}

function validatePhoneNumber(phoneNumber) {
    // Regular expression to match a phone number
    const phoneRegex = /^\d{10}$/

    // Test the phone number against the regular expression
    return phoneRegex.test(phoneNumber)
}

function validateEmail(email) {
    // Regular expression to match an email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Test the email address against the regular expression
    return emailRegex.test(email)
}

module.exports = {
    checkRecentDate,
    validatePhoneNumber,
    validateEmail,
}
