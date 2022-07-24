const express = require("express");
const router = express.Router();

const { auth_token } = require("../middlewares/auth_token");
const { exe_query } = require("../models/assign_db");

router.post("/saveTickets", auth_token, async (req, res) => {
  console.log("in create method after authnetication");

  console.log(req.body);

  const { username, movie_date, movie_name, movie_time, price } = req.body;

  if (
    username == null ||
    movie_date == null ||
    movie_name == null ||
    movie_time == null ||
    price == null
  ) {
    return res.sendStatus(400);
  }

  let e = await exe_query(
    "insert into tickets (cust_name,creation_date,movie_title,movie_time,ticket_price) values " +
      `('${username}','${movie_date}','${movie_name}','${movie_time}',${price})`
  );

  console.log(e);

  res.status(200).send("hello world");
});

router.get("/getTickets", auth_token, async (req, res) => {
  const { username, movie_date = undefined } = req.body;

  if (!username) {
    return res.status(400).send("Invalid Request");
  }

  let getTicketsQuery =
    "select * from tickets where cust_name = " + `'${username}'`;

  if (movie_date) {
    getTicketsQuery = getTicketsQuery + `and creation_date = '${movie_date}'`;
  }

  let get_ticket_details = await exe_query(getTicketsQuery);

  console.log(get_ticket_details);
  res.status(200).send(get_ticket_details);
});

router.delete("/deleteTickets", auth_token, async (req, res) => {
  const del_ticket_details = req.body;

  console.log(del_ticket_details);

  if (!Array.isArray(del_ticket_details))
    return res.status(400).send("Invalid input");
  del_ticket_details.forEach(async (del_ticket) => {
    const result = await exe_query(
      "delete from tickets where cust_name =" +
        `'${del_ticket.username}' and movie_title = '${del_ticket.movie_name}'`
    );

    if (result instanceof Error) {
      return res.status(500);
    }

    console.log(result);
  });

  res.status(200).send("request has been processed");
});

router.patch("/updateTickets", auth_token, async (req, res) => {
  const { movie_name, price } = req.body;

  if (!movie_name) {
    return res.satus(400);
  }
  let update_query = `update table tickets set price = ${price} where movie_title = ${movie_name}`;

  let result = await exe_query(update_query);

  if (result instanceof Error) return res.status(400);
  res.status(200).send("upadate succesfully");
});

module.exports = router;
