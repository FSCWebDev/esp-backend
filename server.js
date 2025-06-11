const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const { authenticateUser, ensureAuthenticated } = require("./middleware/auth");
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const runMongoConfig = require("./configurations/mongo");
const runPassportConfig = require("./configurations/passport");
const runWebSocketConfig = require("./configurations/websockets");

const app = express();

const server = runWebSocketConfig(app);
runMongoConfig();
runPassportConfig();

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", ensureAuthenticated, (req, res) => {
  console.log("Session: ", req.session);
  console.log("User: ", req.user);
  res.json(req.user);
});

app.get("/login", (req, res) => {
  res.send(req.user);
});

app.post("/login", authenticateUser);

// TODO: Implement these as POST requests later.
app.get("/soil", ensureAuthenticated, (_, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/weather", ensureAuthenticated, (_, res) => {
  res.send("<h1>Hello World</h1>");
});

app.post("/weather", ensureAuthenticated, (req, res) => {
  io.emit("weather", {
    temp_c: 20.0,
    temp_f: 34.0,
    humidity: 22,
    pressure: 14,
  });
  console.log(req.body);
  res.status(200).send("<h1>Hello World</h1>");
});

app.get("/pressure", ensureAuthenticated, (_, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/lights", ensureAuthenticated, (_, res) => {
  res.send("<h1>Hello World</h1>");
});

app.get("/trash", ensureAuthenticated, (_, res) => {
  res.send("<h1>Hello World</h1>");
});

server.listen(process.env.PORT, () => {
  console.log("Server started...");
});
