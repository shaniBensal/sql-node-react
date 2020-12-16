const config = {
  user: "sa",
  password: "sbs170390",
  server: "localhost",
  database: "Contacts",
  port: 55104,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustedconnection: true,
    enableArithAbort: true,
    keepAlive: true,
    encrypt: true,
  },
};

module.exports = config;
