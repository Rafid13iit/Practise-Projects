const airQuality = {
  apiKey: "e6a7c226-8401-4e8b-b7f2-4d1359e4a534", // Replace with your actual API key
  fetchAirQuality: function (country, state, city) {
    const apiUrl = "http://api.airvisual.com/v2/city?city=" + city + "&state=" + state + "&country=" + country + "&key=" + this.apiKey;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          alert("No air quality data found.");
          throw new Error("No air quality data found.");
        }
        return response.json();
      })
      .then((data) => this.displayAirQuality(data));
  },
  displayAirQuality: function (data) {
    const { city, state, country, current } = data.data;
    const { aqius, ic } = current.pollution; // Use aqius for the AQI value
    const airQualityLevel = this.getAirQualityLevel(aqius);
    
    document.querySelector(".city").innerText = "Air Quality in " + city + ", " + country;
    document.querySelector(".description").innerText = ic;
    document.querySelector(".index").innerText = "AQI: " + aqius; // Display the AQI value
    document.querySelector(".air-quality").classList.remove("loading");
    document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + city + "')";
    
    // Add a class to change background color based on air quality level
    document.querySelector(".card").classList.add(airQualityLevel);
  },
  getAirQualityLevel: function (aqi) {
    if (aqi <= 50) {
      return "good";
    } else if (aqi <= 100) {
      return "moderate";
    } else if (aqi <= 150) {
      return "unhealthy-for-sensitive-groups";
    } else if (aqi <= 200) {
      return "unhealthy";
    } else if (aqi <= 300) {
      return "very-unhealthy";
    } else {
      return "hazardous";
    }
  },
  search: function () {
    const country = document.getElementById("country").value;
    const state = document.getElementById("state").value;
    const city = document.getElementById("city").value;
    this.fetchAirQuality(country, state, city);
  },
};

document.getElementById("search-button").addEventListener("click", function () {
  airQuality.search();
});

// Listen for Enter key press on input fields
document.getElementById("country").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    airQuality.search();
  }
});

document.getElementById("state").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    airQuality.search();
  }
});

document.getElementById("city").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    airQuality.search();
  }
});
