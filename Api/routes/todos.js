module.exports = (app) => {
  const router = require("express").Router();
  app.use("/api", router);

  const baseUrl = "/contacts";
  const config = require("../config/db");
  const sql = require("mssql");

  router.route(baseUrl).post((req, response) => {
    sql.connect(config, function (err) {
      const bodyReq = { ...req.body };
      if (err) console.log(err);
      const request = new sql.Request();
      return request.query(
        "INSERT INTO ContactsTable (id, firstName, lastName) VALUES(" +
          bodyReq.id +
          ", '" +
          bodyReq.firstName +
          "','" +
          bodyReq.lastName +
          "')",
        function (err, res) {
          return response.json(res);
        }
      );
    });
  });
  router.route(baseUrl + "/:id").get((request, response) => {
    const id = request.params.id;
    sql.connect(config, function (err) {
      if (err) console.log(err);
      const request = new sql.Request();
      return request.query("SELECT * FROM ContactsTable WHERE id = " + id, function (err, recordsets) {
        if (err) {
          console.log(err);
        }
        return response.json(recordsets);
      });
    });
  });

  router.route(baseUrl).get((request, res) => {
    sql.connect(config, function (err) {
      if (err) console.log(err);
      const request = new sql.Request();
      request.query("SELECT * from ContactsTable", function (err, recordsets) {
        if (err) {
          console.log(err);
        }
        res.send(recordsets);
      });
    });
  });
};
