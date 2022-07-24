const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "root",
  database: "TicketBooking",
});

module.exports = {client}

// client.connect();
// client.query("insert into users values ('c','aaaa')", (err, res) => {
//   if (err) console.log(err);
//   console.log(res);
//   client.end();
// });
