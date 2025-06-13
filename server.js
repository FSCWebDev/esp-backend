const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");

const { authenticateUser, ensureAuthenticated } = require("./middleware/auth");
const httpLogger = require("./middleware/httpLogger");

const runMongoConfig = require("./configurations/mongo");
const runPassportConfig = require("./configurations/passport");
const runWebSocketConfig = require("./configurations/websockets");

const logger = require("./utilities/logger");

const app = express();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

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
app.use(httpLogger);

app.get("/", (req, res) => {
  res.json(req.user);
});

app.get("/status", (_, res) => {
  res.status(200).json({ status: "OK", uptime: process.uptime() });
});

app.get("/login", (req, res) => {
  logger.error(
    "User cannot log in; No database connected with valid collection."
  );
  res.sendStatus(501);
});

app.post("/login", authenticateUser, (req, res) => {
  logger.error(
    "User cannot log in; No database connected with valid collection."
  );
  res.sendStatus(501);
});

// TODO: Implement these as POST requests later.
app.get("/soil", ensureAuthenticated, (_, res) => {
  logger.warn("Endpoint unavailable");
  res.sendStatus(501);
});

app.get("/weather", ensureAuthenticated, (_, res) => {
  logger.warn("Endpoint unavailable");
  res.sendStatus(501);
});

app.post("/weather", ensureAuthenticated, (req, res) => {
  logger.warn("Endpoint unavailable");
  res.sendStatus(501);
});

app.get("/lights", ensureAuthenticated, (_, res) => {
  res.sendStatus(501);
});

app.get("/trash", ensureAuthenticated, (_, res) => {
  res.sendStatus(501);
});

server.listen(process.env.PORT, () => {
  logger.info("Server has started...");
});
