const { createLogger, format, transports } = require("winston");
const { combine, colorize, timestamp, prettyPrint, printf } = format;
const { File, Console } = transports;

const logger = createLogger({
  format: combine(
    timestamp(),
    printf(
      info =>
        `[${info.timestamp}] [${info.level.toUpperCase()}] ${info.message}`
    )
  ),
  transports: [
    new File({ filename: "logs/error.log", level: "error" }),
    new File({ filename: "logs/warn.log", level: "warn" }),
    new File({ filename: "logs/info.log", level: "info" }),
    new File({ filename: "logs/http.log", level: "http" }),
    new File({ filename: "logs/verbose.log", level: "verbose" }),
    new File({ filename: "logs/debug.log", level: "debug" }),
    new File({ filename: "logs/silly.log", level: "silly" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new Console({
      format: combine(
        colorize({
          all: true,
          colors: {
            info: "blue",
            error: "red",
            debug: "orange",
            http: "green",
            warn: "yellow",
            verbose: "grey",
            silly: "pink",
          },
        })
      ),
    })
  );
  logger.debug("Debugging enabled!");
}

module.exports = logger;
