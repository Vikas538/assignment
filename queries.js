const querys = {
  insertuser: "insert into user values (?,?);",
  create_ticket:
    "insert into tickets (cust_name,creation_date,movie_title,movie_time,ticket_price) values ",
  alter_ticket: "update table tickets set ",
  get_tickets: "select * from tickets where cust_name = ",
  del_tickets: "delete from tickets where cust_name =",
};

module.exports = { querys };
