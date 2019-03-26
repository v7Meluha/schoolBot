const mysql = require("mysql");
const { getGrades } = require("./lib");

class DB {
  constructor() {
    (this.host = "192.168.42.1"),
      (this.user = "root"),
      (this.database = "dubaischools");
  }

  connect() {
    var connection = mysql.createConnection({
      host: this.host,
      user: this.user,
      database: this.database
    });
    return Promise.resolve(connection);
  }

  getFees(params) {
    console.log(params);
    var givenClass = getGrades(params),
      message = "",
      sql = "SELECT * FROM `feesinfo` WHERE LOWER(schoolName) = ?";
    return this.connect()
      .then(con => {
        return new Promise((resolve, reject) => {
          params.schoolName = params.schoolName.toLowerCase();
          console.log(params.schoolName);
          con.query(sql, [params.schoolName.toLowerCase()], function(
            err,
            result
          ) {
            if (err) {
              reject(err);
            } else {
              message = "The fees is " + result[0][givenClass] + " dirhams";
              console.log(message);
            }
            resolve(message);
          });
        });
      })
      .then(response => {
        console.log(response);
        return response;
      });
  }

  getLocation(coordinates) {
    return this.connect().then(con => {
      return new Promise((resolve, reject) => {
        var sql = `SELECT schoolName, IFNULL(ROUND(( 6371 * acos ( cos ( radians(${
          coordinates.lat
        }) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${
          coordinates.lng
        }) ) + sin ( radians(${
          coordinates.lat
        }) ) * sin( radians( latitude ) ) ) ), 1),0) AS distance,location FROM schoolsinfo HAVING distance <= 5 ORDER BY distance ASC LIMIT 0 , 2`;
        con.query(sql, function(err, result) {
          if (err) reject(err);
          else {
            console.log(result);
            resolve(result[0]);
          }
        });
      });
    });
  }
}

module.exports = DB;
