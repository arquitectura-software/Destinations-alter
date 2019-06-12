const Destination = require("../models/destination");

module.exports = function(app) {
  app.get("/destinations", (req, res) => {
    Destination.getDestinations((err, data) => {
      res.status(200).json(data);
    });
  });

  app.get("/destinations/:id_dest", (req, res) => {
    Destination.getDestinationById(
      parseInt(req.params.id_dest, 10),
      (err, data) => res.status(200).json(data)
    );
  });
  app.post("/destinations", (req, res) => {
    const DestinationData = {
      id_dest: null,
      name: req.body.name,
      description: req.body.description,
      timezone: req.body.timezone,
      landingtime: new Date(req.body.landingtime), //check if works
      boardingtime: new Date(req.body.boardingtime),
      created_at: null,
      updated_at: null
    };
    console.log(DestinationData);
    Destination.createDestination(DestinationData, (err, data) => {
      if (data && data.insertId) {
        res.json({
          success: true,
          message: "Destination created",
          data
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Error"
        });
      }
    });
  });

  app.put("/destinations/:id_dest", (req, res) => {
    const DestinationData = {
      id_dest: parseInt(req.params.id_dest, 10),
      name: req.body.name,
      description: req.body.description,
      timezone: req.body.timezone,
      landingtime: new Date(req.body.landingtime), //check if works
      boardingtime: new Date(req.body.boardingtime),
      created_at: null,
      updated_at: null
    };
    Destination.updateDestination(DestinationData, (err, data) => {
      if (data && data.message) {
        res.json(data);
      } else {
        res.json({
          success: false,
          message: "Error"
        });
      }
    });
  });
  app.delete("/destinations/:id_dest", (req, res) => {
    Destination.deleteDestination(
      parseInt(req.params.id_dest, 10),
      (err, data) => {
        if (
          (data && data.message === "Deleted") ||
          data.message === "Not exist"
        ) {
          res.json({
            success: true,
            data
          });
        } else {
          res.status(500).json({
            message: "Error"
          });
        }
      }
    );
  });
};
