let axios = require ('axios');
let { buildUrl } = require ('./lib.js')

var getCoordinates = (address) => {
  var URL = buildUrl(address)
	return axios.get(URL)
  .then(function (response) {
    console.log(JSON.stringify(response.data.results[0].geometry.location));
    return Promise.resolve(response.data.results[0].geometry.location)
  	
  })
  .catch(function (error) {
    console.log(error);
  });
}
exports.getCoordinates = getCoordinates

//getCoordinates("17, 21b St ,Dubai , United Arab Emirates")