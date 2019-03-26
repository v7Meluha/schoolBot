 const { doAction } = require('./actions')

var getResponse = (action, params) => {
        return doAction(action, params)
        .then((result) => {
            console.log("result" + result)
        return fulfillmentTextResponse(result) 
        })  
        .catch(function(err) {
            console.log(err)
            return err;
        })
 }
 exports.getResponse = getResponse

var fulfillmentTextResponse = (message) => {
    return Promise.resolve({ 
        "fulfillmentText": "message",
        "fulfillmentMessages": [{
            "platform": "TELEGRAM",
            "payload": {
                "telegram": {
                    "text": message,
                    "parse_mode": "Markdown"
                }
            }
        }]
    });
}

var fileResponse = (message) => {
    return Promise.resolve({ 
        "fulfillmentText": "message",
        "fulfillmentMessages": [{
            "platform": "TELEGRAM",
            "payload": {
                "telegram": {
                    "text": message,
                    "attachments": "doc.pdf"
                    "parse_mode": "Markdown"
                }
            }
        }]
    });
}