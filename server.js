const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { authenticateUser } = require("./middleware/http/auth");
const httpLogger = require("./middleware/http/httpLogger");

const runMongoConfig = require("./configurations/mongo");
const runWebSocketConfig = require("./configurations/websockets");

const logger = require("./utilities/logger");

const app = express();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const server = runWebSocketConfig(app);
runMongoConfig();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);

app.get("/", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/status", authenticateUser, (_, res) => {
  res.json({ status: "OK", uptime: process.uptime() });
});

app.get("/lights", authenticateUser, (_, res) => {
  logger.warn("Endpoint not implemented yet");
  res.sendStatus(501);
});

app.post("/lights", authenticateUser, (_, res) => {
  logger.warn("Endpoint not implemented yet");
  res.sendStatus(501);
});

server.listen(process.env.PORT, () => {
  logger.info("Server has started...");
});
