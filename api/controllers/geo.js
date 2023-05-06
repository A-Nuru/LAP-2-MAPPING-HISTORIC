const Geo = require('../models/geo')

async function getData(req,res) {
    try {
        const geoJsonData = await Geo.getData()
        res.json(geoJsonData)
    } catch (error) {
        res.status(500).json({"error": error.message})
    }
}

module.exports = {
    getData
}