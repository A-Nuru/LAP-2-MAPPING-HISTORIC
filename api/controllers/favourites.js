const Favourites = require('../models/favourites')

//not being used - remove?
async function getData(req,res) {
    try {
        const favourites = await Favourites.getFavourites()
        //console.log(geoJsonData)
        res.json(favourites)
    } catch (error) {
        res.status(500).json({"error": error.message})
    }
}

 async function getFavouriteById(req, res) {
    try {
      const idx = parseInt(req.params.id)
      const favourite = await Favourites.getFavouriteById(idx)
      res.status(200).json({
        success: true,
        favourite: favourite,
      })
    } catch (err) {
      res.status(404).json({
        success: false,
        message: "Unable to retrieve favourite",
        error: err,
      })
    }
  }

//function to retrieve points_id for a user - should be arrray of points id?
async function getFavouritesByUser(req, res) {
    try {
      const idx = parseInt(req.params.id)
      const favourite = await Favourites.getFavouritesByUser(idx)
      console.log(favourite)
      res.status(200).json({
        success: true,
        favourite: {
            user_id: favourite.user_id,
            favourites_ids: favourite.points_id
        },
      })
    } catch (err) {
      res.status(404).json({
        success: false,
        message: "Unable to retrieve favourite",
        error: err,
      })
    }
  }

  async function addFavourite(req, res) {
    try {
      const data = req.body
      console.log(data)
      const favourite = await Favourites.create(data)
      console.log(favourite)
      res.status(201).json({
        success: true,
        favourite: favourite
      })
    } catch (err) {
      res.status(404).json({
        success: false,
        message: "Unable to add favourite",
        error: err,
      })
    }
  }

  async function destroy(req, res) {
    try {
        const idx = parseInt(req.params.id)
        const favourite = await Favourites.getFavouriteById(idx)
        console.log(favourite)
        const result = await favourite.destroy()
        console.log(result)
        res.status(204).json({
            success: true,
            message: "favourite deleted"
          })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Unable to delete favourite - controller",
            error: err,
          })
    }
}

module.exports = {
    getData, getFavouriteById, getFavouritesByUser, addFavourite, destroy
}