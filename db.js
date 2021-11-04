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
});

app.post("/create", (req, res) => {
  const pid = req.body.pid;
  const name = req.body.name;
  const age = req.body.age;
  const ward = req.body.ward;
  const doctor = req.body.doctor;

  db.query(
    "INSERT INTO patients(pid,name, age, ward, doctor) VALUES (?,?,?,?,?)",
    [pid,name, age, ward,doctor],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/patients", (req, res) => {
  db.query("SELECT * FROM patients", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const pid = req.body.pid;
  const doctor = req.body.doctor;
  db.query(
    "UPDATE patients SET doctor = ? WHERE pid = ?",
    [doctor, pid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:pid", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM patients WHERE id = ?", pid, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get('/',(req,res)=>{
  res.send("WELCOME")
})

app.listen(3001, () => {
  console.log("server is running on port 3001");
});