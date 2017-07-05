var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
};

const CLIENT_ID = '9c41da993e6a483185cfdbe89a5ec183'
const CLIENT_SECRET = '980989bdaa734dc8b44ad79ee346fdc8'
// ELVIS ID = 43ZHCT0cAZBISjO8DG9PnE
$(function() {
  getAccessToken()
  // getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  return tracks.tracks
}

function extractPopularity(tracks) {
  let popularity = []
  tracks.forEach((track) => {
    popularity.push(track.popularity)
  })
  return popularity
}

function extractNames(tracks) {
  let trackNames = []
  tracks.forEach((track) => {
    trackNames.push(track.name)
  })
  return trackNames
}

function chartData(labels, inputData) {
  return {
    labels: labels,
    datasets: [{
      data: inputData,
      fillColor: 'rgba(220,220,220,0.5)',
      strokeColor: 'rgba(220,220,220,0.8)',
      highlightFill: 'rgba(220,220,220,0.75)',
      highlightStroke: 'rgba(220,220,220,1)'
    }]
  }
  // your code here

  // use the dataSetProperties variable defined above if it helps
}

function getAccessToken() {
  $.ajax({
    url: 'https://accounts.spotify.com/api/token',
    type: 'post',
    data: {
      grant_type: "client_credentials",
    },
    headers: {
      Authorization: 'Basic OWM0MWRhOTkzZTZhNDgzMTg1Y2ZkYmU4OWE1ZWMxODM6OTgwOTg5YmRhYTczNGRjOGI0NGFkNzllZTM0NmZkYzg=',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function(data) {
      getSpotifyTracks(data)
    }
  })
}

function getSpotifyTracks(data){
  let access_token = data.access_token
  $.ajax({
    url: "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE",
    type: 'get',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    success: function(data) {
      success(data)
    }
  })
  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass it's
  // parameter the data it received

  // use the url variable defined above if it helps
}

function success(parsedJSON) {
  let tracks = extractTop10Tracks(parsedJSON)
  let trackNames = extractNames(tracks)
  let popularity = extractPopularity(tracks)
  let data = chartData(trackNames, popularity)
  let ctx = document.getElementById('spotify-chart').getContext('2d')
  let newChart = new Chart(ctx).Bar(data)

  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop20Tracks - pass it tracks
  //  2. extractNames -  pass it the result of #1
  //  3. extractPopularity - pass it the result of #1
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
}
