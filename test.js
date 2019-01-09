let MapboxClient = require('mapbox');

const mbxDirections = require('@mapbox/mapbox-sdk/services/directions');
const directionsClient = mbxDirections({ accessToken: 'pk.eyJ1IjoiYnl0ZW5haWphIiwiYSI6ImNqcXBpNzRsazAxcHo0OHFnenFrYm5hcGoifQ.N0iSsru4xsBgXerxpCelQw' });

let client = new MapboxClient('pk.eyJ1IjoiYnl0ZW5haWphIiwiYSI6ImNqcXBpNzRsazAxcHo0OHFnenFrYm5hcGoifQ.N0iSsru4xsBgXerxpCelQw');

directionsClient
.getDirections({
  waypoints: [
    {
      coordinates: [6.8091802, 6.1998507],
      approach: 'unrestricted'
    },
    {
      coordinates: [9.1260371, 7.493364]
    },
  
  ]
})
.send()
.then(response => {
  const directions = response.body;
  console.log(directions.routes[0].distance/1000)
});

    //   6.8091802,6.1998507

    // 9.1260371, 7.493364