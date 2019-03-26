var DB = require("./db.js")
let db = new DB()
const moment = require("moment")
const sendMail = require("./sendMail")
const {
 getMonth,
 checkTimings,
 checkHoliday
  } = require("./lib")
const {getCoordinates} = require("./getCoordinates")
const { formURL } = require("./info")

var doAction = (action, params) => {
    console.log(JSON.stringifu(params))
    switch(action){
        case "admission":
        return getAdmission(params)
        break;
        case "timings":
        return getTimings(params)
        break;
        case "holiday":
        return getHoliday(params)
        break;
        case "leave":
        return getLeaves(params)
        break;
        case "fees":
        return getFees(params[0].parameters)
        break;
        case "meeting":
        return scheduleMeeting(params[1].parameters)
        break;
        case "location":
        return getLocation(params[0].parameters)
        break;
        case "form":
        return getForm(params[0].parameters)
        break;
        default:
        return null
        break;
    }
}
exports.doAction = doAction

var getFees = (params) => {
	return db.getFees(params)
	.then((result) => {
		return result
	})
}

var getTimings = (params) => {
    return checkTimings(params)
    .then((result) => {
            return Promise.resolve(result)
    })

}

var getHoliday = (params) => {
    return checkHoliday(params)
    .then((result) => {
            return Promise.resolve(result)
    })
}

var scheduleMeeting = (params) => {
    return sendMail(params)
    .then((result) => {
            return Promise.resolve(result)
    })
}

var getForm = (params) => {
    return Promise.resolve(`You can find it [here](${formURL})`)
}

var getLeaves = (params) => {
    return Promise.resolve("The maximum number of holidays any student can take is limited to 15 per term.")
}

var getLocation = (params) => {
    return getCoordinates(params.address)
    .then((coordinates) => {
        coordinates.radius = 5
        return db.getLocation(coordinates)
    })
    .then((result) => {
        var message = `Okay. ${result.schoolName} is the closest from your location. It is ${result.distance} kms from you.`
        return message
    })
}

var getAdmission = (params) => {
    return new Promise.resolve("Admissions closed for this academic year")
}
