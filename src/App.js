// src/App.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

function App() {
  const [cityname, setCityname] = useState("Jyväskylä");
  const [weather, setWeather] = useState(null);

  const API_KEY = process.env.REACT_APP_WEATHER_APIKEY;
  const URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const ICON_URL = 'http://openweathermap.org/img/wn/';

  const getWeather = () => {
    axios
      .get(URL + cityname + '&appid=' + API_KEY + '&units=metric')
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setWeather(null);
      });
  };

  return (
    <div className="App">
      <h1>React Weather Application</h1>
      <p>
        This application will fetch a weather forecast from the OpenWeather.
        Just type the city name and click Get Forecast button!
      </p>
      <form>
        <TextField
          label="Cityname"
          defaultValue="Jyväskylä"
          variant="outlined"
          size="small"
          id="outlined-basic"
          onChange={(e) => setCityname(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => getWeather()}
        >
          Get Forecast
        </Button>
      </form>

      <h2>Loaded weather forecast</h2>
      {weather !== null &&
        <div>
          City: {weather.name}<br />
          Main: {weather.weather[0].main}<br />
          Temp: {weather.main.temp} °C<br />
          Feels: {weather.main.feels_like} °C<br />
          Min-Max: {weather.main.temp_min} - {weather.main.temp_max} °C<br />
          <img
            alt={cityname}
            style={{ height: 100, width: 100 }}
            src={ICON_URL + weather.weather[0].icon + '.png'}
          />
        </div>
      }

      {weather === null &&
        <p>-</p>
      }
    </div>
  );
}

export default App;
