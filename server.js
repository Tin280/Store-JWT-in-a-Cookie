// server.js
const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cors());
const jwtTin = "TinTin";
app.get("/jwt", (req, res) => {
  const token = jsonwebtoken.sign({ user: "johndoe" }, jwtTin);
  res.cookie("token", token, { httpOnly: true });
  res.json({ token });
});
app.use(cookieParser());
app.use(
  jwt({
    secret: "TinTin",
    algorithms: ["HS256"],
    getToken: (req) => req.cookies.token,
  })
);
const foods = [
  { id: 1, description: "Cake" },
  { id: 2, description: "Banana" },
  { id: 3, description: "eggs" },
];
app.get("/foods", (req, res) => {
  res.json(foods);
});
app.listen(3001);
console.log("App running on localhost:3001");
