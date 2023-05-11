const { Router } = require('express');

const favController = require('../controllers/favourites');

const favRouter = Router();

favRouter.get("/", favController.getData); //remove this?
favRouter.get("/:id", favController.getFavouriteById);
favRouter.get("/user/:id", favController.getFavouritesByUser);

favRouter.post("/", favController.addFavourite);
favRouter.delete("/:id", favController.destroy);



module.exports = favRouter;