function checkEqualString(str1, str2) {
    if (str1.length !== str2.length) return false;
    for (let i = 0; i < str1.length; i++) {
        if (str1.charAt(i) != str2.charAt(i)) return false;
    }
    return true;
}

function getReply(msg) {
    if (checkEqualString(msg, "GG")) {
        return "mfs"
    } else if (checkEqualString(msg, "SD")) {
        return "madarchod"
    }
    return "no fucks given"
}

module.exports = {
    getReply
}