const number = require('number-to-words');
const {
    holidays,
    schoolTime,
    formURL
} = require("./info")
const moment = require("moment")

var checkHoliday = (params) => {
    var date = new Date(),
        month = moment(date).format('MM'),
        day = moment(date).format('DD'),
        nextHoliday = null,
        i = 0;

    for (i = 0; i < 11; i++) {
        if (month <= holidays[i].month && day <= holidays[i].date) {
            nextHoliday = holidays[i]
            break;
        }
    }
    if (nextHoliday) {
        month = getMonth(nextHoliday.month)
        message = `The next holiday is for *${nextHoliday.name}*,on ${nextHoliday.day}, ${month} ${nextHoliday.date}`
    } else
        message = "There are no public holidays coming up"
    return Promise.resolve(message)
}
exports.checkHoliday = checkHoliday

var checkTimings = (params) => {
    var message;
    if ( params.date !== '') {
        var date = new Date(params.date); 
        day = moment(date).day();
        if (day === 5 || day === 6)
            message = "It's a holiday. The school doesn't work on Fridays and Saturdays"
    } else if (params.negate !== '') {
        switch (params.timing) {
            case 'open':
                message = `The school closes at ${schoolTime.close}`
                break;

            case 'close':
                message = `The school opens at ${schoolTime.open}`
                break;

            default:
                break;
        }
    } else if (params.timing === 'open') {
    		console.log("its open")
        message = `The school is open from ${schoolTime.open}`
    } else if (params.timing === 'close') {
        message = `The school closes at ${schoolTime.close}`
    } else {
        message = schoolTime.working
    }
    return Promise.resolve(message)
}
exports.checkTimings = checkTimings

let mailContent = (params) => {
    return `Sir/Madam,  \nThis mail is regarding a meeting request from Mr/Mrs. ${params.parentName}, parent of ${params.childName}.\n 
   Kindly respond to the following mail ID: ${params.email} and setup a meeting for the same. \n Thanks and Regards, \n -schoolAssistant (@bot)`
}
exports.mailContent = mailContent

exports.secret = "skcript@123"

var getGrades = (params) => {
    if (params.preSchool !== '') {
        return params.preSchool
    } else
        var givenClass = number.toWords(params.class)
    return `grade_${givenClass}`
}
exports.getGrades = getGrades

var getMonth = (number) => {
    var month = new Array();
    month[1] = "January";
    month[2] = "February";
    month[3] = "March";
    month[4] = "April";
    month[5] = "May";
    month[6] = "June";
    month[7] = "July";
    month[8] = "August";
    month[9] = "September";
    month[10] = "October";
    month[11] = "November";
    month[12] = "December";
    return month[number];
}

var stringToArray = (address) => {
    var str = address.trim().split(" ");
    return str.join("+");
};

var buildUrl = (address) => {
    var result = stringToArray(address) + '&key=AIzaSyBPIcPlxBxbF3ETTb6Vc3tFblxehfI6KKY',
        baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    baseUrl += result
    return baseUrl
}

exports.buildUrl = buildUrl

exports.secret = 'secret'