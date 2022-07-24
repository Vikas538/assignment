const express = require("express");
const router = express.Router();

const { auth_token } = require("../middlewares/auth_token");

const { exe_query } = require("../models/assign_db");

router.post("/analytics/movie", auth_token, async (req, res) => {
  const { method } = req.query;
  const { movie_name, from_date, to_date } = req.body;

  if (
    movie_name == undefined ||
    from_date == undefined ||
    to_date == undefined
  ) {
    return res.status(400);
  }

  let from_month = parseInt(from_date.split("-")[1]);
  let to_month = parseInt(to_date.split("-")[1]);

  console.log(from_month, to_month);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  console.log(method);
  if (method) {
    analytics = [];
    while (from_month <= to_month) {
      let analytics_by_month = {
        month: months[from_date - 1],
      };
      let query = `SELECT SUM (ticket_price) AS total FROM tickets WHERE movie_title = '${movie_name}' and EXTRACT(MONTH FROM creation_date)=${from_month}`;

      let result = await exe_query(query);

      if (result instanceof Error) {
        console.log(result);
        return res.send("Failed");
      }

      analytics_by_month.summaryProfit = result[0].total;

      analytics.push(analytics_by_month);
    }
    return res.send(analytics);
  }

  
});

module.exports = router;
