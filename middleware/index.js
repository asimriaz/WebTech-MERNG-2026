import express from "express";
import courseRouter from "./routes/index.js";

const app = express();
const PORT = 3000;


app.use("/api", courseRouter);

const logger = (req, res, next) => {
  req.msg = "<br>This is from logger middleware!";
  console.log(`${req.method} ${req.url}`);
  next();
};

const auth = (req, res, next) => {
  if (req.query.username === "peter") {
    next();
  } else {
    res.send("Unauthorized Access");
  }
};

app.use(logger);

app.get("/", (req, res) => {
  res.send(`Hello, World! ${req.msg}`);
});

app.get("/login", auth, (req, res) => {
  res.send(`Welcome to the dashboard!  ${req.msg}`);
});

app.get("/about", (req, res) => {
  res.send(`About Us! ${req.msg}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
