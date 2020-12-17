module.exports = (app) => {
  const router = require("express").Router();
  app.use("/api", router);

  const baseUrl = "/contacts";
  const config = require("../config/db");
  const sql = require("mssql");

  //update by Id
  router.route(baseUrl + "/:id").post((req, response) => {
    sql.connect(config, function (err) {
      const bodyReq = req.body.contact;
      if (err) console.log(err);
      const request = new sql.Request();
      return request.query(
        'UPDATE ContactsTable SET id =' +bodyReq.id +',firstName = ' +bodyReq.firstName + ', lastName = ' +bodyReq.lastName + ' WHERE id = ' + bodyReq.id,
        function (err, recordsets) {
          return response.send(recordsets);
        }
      );
    });
  });

  //delete by ID
  router.route(baseUrl + "/:id").delete((request, response) => {
    const id = request.params.id;
    sql.connect(config, function (err) {
      if (err) console.log(err);
      const request = new sql.Request();
      return request.query(
        'DELETE FROM ContactsTable WHERE id ='+ id,
        function (err, res) {
          return response.send({status: 200});
        }
      );
    });
  });

//create new
  router.route(baseUrl).post((req, response) => {
    sql.connect(config, function (err) {
      const bodyReq = req.body.contact;
      console.log(bodyReq)
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
        function (err, recordsets) {
          return response.json(recordsets);
        }
      );
    });
  });

  //getBy id
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

  // get all
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
