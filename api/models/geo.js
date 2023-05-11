const db = require('../database/connect')

class Geo {
    constructor(type, features) {
      this.type = type;
      this.data = {
        type: "FeatureCollection",
        features: features,
      };
    }
  
    addFeature(properties, geometry) {
      const feature = {
        type: "Feature",
        properties: properties,
        geometry: geometry,
      };
      this.data.features.push(feature);
    }


    static async getFeature() {

        const response = await db.query("SELECT description, icon, ST_AsGeoJSON(geom) as geom FROM points")
        console.log(response)
       // return response.rows.map(p => new Geo(p));

       return response.rows.map(p => 
        new Geo("geojson", [

            {
              type: "Feature",
              properties: {
                description: p.description,
                icon: p.icon,
              },

              geometry: JSON.parse(p.geom)
              ,
            }
        ))

          console.log(features)

        return new Geo("geojson", features)


              geometry: 

            JSON.parse(p.geom)
              ,
            },
          ])
        )


  }
}

module.exports = Geo;




// let sample = {
//     // This GeoJSON contains features that include an "icon"
//     // property. The value of the "icon" property corresponds
//     // to an image in the Mapbox Streets style's sprite.
//         'type': 'geojson',
//         'data': {
//         'type': 'FeatureCollection',
//         'features': [
//             {
//                 'type': 'Feature',
//                 'properties': {
//                     'description': 'Make it Mount Pleasant',
//                     'icon': 'theatre-15'
//                 },
//                 'geometry': {
//                     'type': 'Point',
//                     'coordinates': [-77.038659, 38.931567]
//                 }
//             } 
//         ]
//     }
// }

