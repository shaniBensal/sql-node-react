const config = {
  user: "sa",
  password: "sbs170390",
  server: "localhost",
  database: "Todos",
  port: 55104,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    trustedבonnection: true,
    enableArithAbort: true,
    keepAlive: true,
    encrypt: true,
  },
};

module.exports = config;
