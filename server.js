const express = require("express");
const app = express();

const analytics_movie_router = require("./routes/analytics_movie");
const analytic_visited_router = require("./routes/analytics_visited");
const ticket_router = require("./routes/tickets");

app.use(express.json());

app.use(analytics_movie_router);
app.use(analytic_visited_router);
app.use(ticket_router);

require("dotenv").config();
var users = [];

app.listen(process.env.port, (err) => {
  console.log("server running on port " + process.env.port);
});
