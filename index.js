const express = require('express')
const app = express();
var bodyParser = require('body-parser');
var Bot = require('./getResponse');

app.use(bodyParser.json());
app.use(express.json());

app.post("/", (req, res) => {
    var action = req.body.queryResult.action;
    var params = req.body.queryResult.parameters;
      if (req.body.queryResult.hasOwnProperty('outputContexts')) {
          params = req.body.queryResult.outputContexts
      }
    var response = Bot.getResponse(action, params)
    return response
        .then(function(message) {
            res.json(message);
        })
})
app.listen(5000, () => console.log("starting server"));
