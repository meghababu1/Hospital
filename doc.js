const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "HosSystem",
  port:3306
});

app.post("/create", (req, res) => {
  const did = req.body.did;
  const name = req.body.name;
  

  db.query(
    "INSERT INTO doctors (id,name) VALUES (?,?)",
    [did,name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/doctors", (req, res) => {
  db.query("SELECT * FROM doctors", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const did = req.body.did;
  const pid = req.body.id;
  db.query(
    "UPDATE doctors SET did = ? WHERE pid = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:did", (req, res) => {
  const did = req.params.did;
  db.query("DELETE FROM doctors WHERE did = ?", did, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});