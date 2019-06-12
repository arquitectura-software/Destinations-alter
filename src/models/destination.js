const mysql = require("mysql");

connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "destinations",
  multipleStatements: true
});

let destinationModel = {};

destinationModel.getDestinations = callback => {
  if (connection) {
    connection.query(
      "SELECT * FROM Destinations ORDER BY id_dest",
      (err, rows) => {
        if (err) {
          throw err;
        } else {
          callback(null, rows);
        }
      }
    );
  }
};

destinationModel.getDestinationById = (id_dest, callback) => {
  connection.query(
    `SELECT * FROM Destinations WHERE id_dest = ${id_dest}`,
    (err, data) => {
      if (err) {
        throw err;
      } else {
        callback(null, data);
      }
    }
  );
};

destinationModel.createDestination = (destinationData, callback) => {
  if (connection) {
    connection.query(
      "INSERT INTO Destinations set ?",
      destinationData,
      (err, result) => {
        if (err) {
          throw err;
        } else {
          callback(null, {
            insertId: result.insertId
          });
        }
      }
    );
  }
};

destinationModel.updateDestination = (destinationData, callback) => {
  if (connection) {
    const sql = `UPDATE Destinations  set
                        name= ${connection.escape(destinationData.name)},
                        description= ${connection.escape(
                          destinationData.description
                        )},
                        timezone= ${connection.escape(
                          destinationData.timezone
                        )},
                        landingtime= ${connection.escape(
                          destinationData.landingtime
                        )},
                        boardingtime= ${connection.escape(
                          destinationData.boardingtime
                        )}
                        WHERE id_dest = ${connection.escape(
                          destinationData.id_dest
                        )}
                    `;
    connection.query(sql, (err, res) => {
      if (err) {
        throw err;
      } else {
        callback(null, {
          message: "success"
        });
      }
    });
  }
};

destinationModel.deleteDestination = (id_dest, callback) => {
  if (connection) {
    let sql = `
        SELECT * FROM Destinations WHERE id_dest = ${connection.escape(id_dest)}
        `;
    connection.query(sql, (err, row) => {
      if (row) {
        let sql = `
                DELETE FROM Destinations WHERE id_dest = ${connection.escape(
                  id_dest
                )}
                `;
        connection.query(sql, (err, res) => {
          if (err) {
            throw err;
          } else {
            callback(null, {
              message: "Deleted"
            });
          }
        });
      } else {
        callback(null, {
          message: "Not exist"
        });
      }
    });
  }
};

module.exports = destinationModel;
