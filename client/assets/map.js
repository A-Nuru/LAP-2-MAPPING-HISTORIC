import { mapboxApiToken } from "./mapboxapi.js";
// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = mapboxApiToken;
const map = new mapboxgl.Map({
  container: "map",
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/streets-v12",
  center: [-77.04, 38.907],
  zoom: 11.15,
});

map.on("load", async () => {
  //   map.loadImage(  "https://docs.mapbox.com/mapbox-gl-js/assets/cat.png", //need to get these images from backend / host them somewhere
  //     async (error, image) => {
  //       if (error) throw error;

  // Add the image to the map style.
  // map.addImage("cat", image);

  //get our geojson data from the database
  let data = await getGeoJsonObj(); //.then( resp => createPlacesButtons(resp));
  //console.log(data);
  createPlacesButtons(data);

  //add geojson data to mapbox
  map.addSource("places", data);
  //getGeoJsonData()

  // Add a layer showing the places.
  map.addLayer({
    id: "places",
    type: "symbol",
    source: "places",
    layout: {
      "icon-image": ["get", "icon"],
      "icon-allow-overlap": true,
    },
  });

  // When a click event occurs on a feature in the places layer, open a popup at the
  // location of the feature, with description HTML from its properties.

  // do this also when user selects location from dropdown menu -how?

  map.on("click", "places", (e) => {
    //console.log(e)
    // Copy coordinates array.
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(map);

    map.flyTo({
      center: coordinates,
      zoom: 15
    });
  });

  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on("mouseenter", "places", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  // Change it back to a pointer when it leaves.
  map.on("mouseleave", "places", () => {
    map.getCanvas().style.cursor = "";
  });

  let buttons = document.getElementsByClassName("placeButton");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = () => {
      console.log(buttons[i].innerText);

      let coorDescrArray = getFeaturesByDescriptionSubstring(buttons[i].innerText, data)

      console.log(coorDescrArray)

      //console.log(data);

      for (let j = 0; j < coorDescrArray.length; j++) // how to get rid of other open popups? / also to center the map on the popup
      {
        if (extractString(coorDescrArray[j].description) == buttons[i].innerText)
        {

          const popUps = document.getElementsByClassName('mapboxgl-popup');
          /** Check if there is already a popup on the map and if so, remove it */
          if (popUps[0]) popUps[0].remove();

          new mapboxgl.Popup().setLngLat(coorDescrArray[j].coordinates).setHTML(coorDescrArray[j].description).addTo(map);

          map.flyTo({
            center: coorDescrArray[j].coordinates,
            zoom: 15
          });
        }
      }
    };
  }
});

//for the sidebar
createOpenNavElem();
//addToFavourites();
// }); //use this if adding custom images instead

//document.getElementsByClassName("placeButton").addEventListener('click', console.log("bla"))
//function to get the geojson object from the db
async function getGeoJsonObj() {
  const response = await fetch("http://localhost:3000/geojson");

  if (response.status == 200) {
    const geoJsonData = await response.json();
    //console.log(geoJsonData)
    return geoJsonData;
  } else {
    return "error";
  }
}

//function to get coordinates and description for a place name, from the geojson data
function getFeaturesByDescriptionSubstring(substring, data) {
    const features = data.data.features;
    const result = [];
  
    for (let i = 0; i < features.length; i++) {
      const description = features[i].properties.description;

      const strongText = extractString(description)
  
      if (strongText.includes(substring)) {

        console.log(features[i].geometry.coordinates)
        result.push({
          coordinates: features[i].geometry.coordinates,
          description: description
        });
      }
    }
  
    return result;
  }

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function createOpenNavElem() {
  document
    .getElementsByClassName("closebtn")[0]
    .addEventListener("click", closeNav);

  let openNavSpan = document.createElement("span");
  openNavSpan.id = "openNav";
  openNavSpan.innerText = "Favorites (Click here)";

  document.body.appendChild(openNavSpan);

  openNavSpan.addEventListener("click", openNav);
}

function createFavouritesButton() {

    const favButton = document.createElement("button");
    favButton.className = "button";
    favButton.id = "no";

    const svgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgElement.setAttribute("width", "24");
      svgElement.setAttribute("height", "24");
      svgElement.setAttribute("viewBox", "0 0 24 24");
   
      const path1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path1.setAttribute(
        "d",
        "M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"
      );
  
      svgElement.appendChild(path1);

      favButton.appendChild(svgElement);

      favButton.addEventListener("click", () => {
        if (favButton.id === "no") {
            favButton.id = "yes"
            favButton.classList.add("active");
        } else if (favButton.id === "yes") {
            favButton.id = "no"
            favButton.classList.remove("active");
        }
      })

      return favButton;

}

//function to add places buttons based on backend places data
function createPlacesButtons(data) {
  const sideNavDiv = document.getElementById("mySidenav");
  //create children elements based on the data from db

  const features = data.data.features;

  //get the descrption data needed for buttons
  let placeNameArray = [];
  for (let i = 0; i < features.length; i++) {
    placeNameArray.push(extractString(features[i].properties.description));

  }

  for (let i = 0; i < placeNameArray.length; i++) {
    const lineDiv = document.createElement("div");
    lineDiv.className = "align"

    const placeButton = document.createElement("a");
    placeButton.className = "placeButton";
    placeButton.innerText = placeNameArray[i];

    let favButton = createFavouritesButton()

    lineDiv.appendChild(placeButton);
    lineDiv.appendChild(favButton)
   // lineDiv.appendChild(svgElement);
    //sideNavDiv.appendChild(svgElement);

    sideNavDiv.appendChild(lineDiv);
  }
}

//on click of favourite place, add it as favourite in the backend (?)
function addToFavourites() {
  //document.getElementsByClassName("favourite")[0].addEventListener('click', console.log("add to fav"))
}

function extractString(str) {
  const regex = /<strong>(.*?)<\/strong>/; // regular expression to match the string between <strong> tags
  const match = str.match(regex); // execute the regular expression on the input string

  if (match) {
    return match[1]; // return the first capturing group (the string between <strong> tags)
  } else {
    return null; // return null if no match found
  }
}

// function getGeoJsonData() {
//   let obj = {
//     type: "geojson",
//     data: {
//       type: "FeatureCollection",
//       features: [
//         {
//           type: "Feature",
//           properties: {
//             description:
//               '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
//             icon: "theatre-15",
//           },
//           geometry: {
//             type: "Point",
//             coordinates: [-77.038659, 38.931567],
//           },
//         },
//       ],
//     },
//   };

//   console.log(obj);
//   return obj;
// }

// let obj = {
//   type: "geojson",
//   data: {
//     type: "FeatureCollection",
//     features: [
//       {
//         type: "Feature",
//         properties: {
//           description:
//             '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
//           icon: "theatre",
//         },
//         geometry: {
//           type: "Point",
//           coordinates: [-77.038659, 38.931567],
//         },
//       },
//       {
//         type: "Feature",
//         properties: {
//           description:
//             '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
//           icon: "theatre",
//         },
//         geometry: {
//           type: "Point",
//           coordinates: [-77.003168, 38.894651],
//         },
//       },
//     ],
//   },
// };
