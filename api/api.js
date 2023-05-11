const express = require("express");
const cors = require("cors");
const path = require("path");

const logRoutes = require('./middleware/logger');
const postRouter = require('./routers/post');
const userRouter = require('./routers/user');

const geoRouter = require ('./routers/geo');
const favRouter = require('./routers/favourites');

const geoRouter = require ('./routers/geo')


const api = express();

api.use(cors());
api.use(express.json());
api.use(logRoutes);

api.get("/", (req, res) => {
  res.json({
    name: "Discretion",
    description: "Send and receive private messages.",
  });
});
api.use("/posts", postRouter);
api.use("/users", userRouter);
api.use("/geojson", geoRouter);
api.use("/favourites", favRouter);


module.exports = api;
