export function isUrl(url) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?' + // port
        '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
        '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(url);
}

export function isEmpty(a) {
    return a === null || a === '';
}

export function isProvince(province) {
    let province_list = ['limpopo', 'mpumalanga', 'north west', 'gauteng', 'kwazulu natal', 'eastern cape', 'western cape', 'northern cape', 'orange free state'];
    for (let i = 0; i < province_list.length; i++) {
        if (province === province_list[i]) {
            return true;
        }
    }
    return false;
}


export function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);

}

export function validatePassword(password) {
    let re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
}

export function validateUsername(username) {
    let re = /^\w+$/;
    return re.test(username);
}

export function isNumber(n) {
    return typeof (n) !== "boolean" && !isNaN(n);
}

export function isCell(n) {
    return !isEmpty(n) && ((n.length === 10) || (n.length === 13))
}

export function isTel(n) {
    return isCell(n)
}

export function isFax(n) {
    return isCell(n)
}

export function getAge(dateString) {

    let dates = dateString.split("-");
    let d = new Date();

    let userday = dates[2];
    let usermonth = dates[1];
    let useryear = dates[0];

    let curday = d.getDate();
    let curmonth = d.getMonth() + 1;
    let curyear = d.getFullYear();

    let age = curyear - useryear;

    if ((curmonth < usermonth) || ((curmonth === usermonth) && curday < userday)) {
        age--;
    }
    return age;
}

export function isIDNumber(n) {
    return (isNumber(n)) && (n.length === 13);
}
