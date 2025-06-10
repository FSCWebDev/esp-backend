const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { authenticateUser, ensureAuthenticated } = require("./middleware/auth");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const users = [{ id: 1, username: "Jake3496", password: "jcowkaido" }];

const app = express();
const server = http.createServer(app);

passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find(u => u.username === username);
    if (!user) return done(null, false, { message: "Incorrect username" });

    if (password === user.password) {
      return done(null, user);
    }

    return done(null, false, { message: "Incorrect password" });
    // bcrypt.compare(password, user.password, (err, result) => {
    //   if (err) return done(err);
    //   if (!result) return done(null, false, { message: "Incorrect password." });
    //   return done(null, user);
    // });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

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

// Allows url encoded form data

io.on("connection", socket => {
  console.log("a user connected");

  socket.on("client-message", msg => {
    console.log("client says:", msg);
    socket.emit("server-message", "Welcome!");
  });

  socket.emit("server-message", "Welcome!");
});

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
  console.log(`WebSocket Started on port ${process.env.PORT}`);
  console.log(`Current environment is ${process.env.NODE_ENV}`);
});
