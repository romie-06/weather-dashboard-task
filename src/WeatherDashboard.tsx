import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  IconButton,
  Alert,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import WeatherTable from "./WeatherTable.tsx";
import WeatherCards from "./WeatherCards.tsx";

// const API_KEY = "739e9964f638add372c60ab3eb1ff2c";
const cities = ["London", "Birmingham", "Manchester", "Edinburgh", "Cardiff"];

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: { main: string; description: string; icon: string }[];
  wind: { speed: number };
}

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    async function fetchWeather() {
      try {
        const responses = await Promise.all(
          cities.map(city =>
            axios.get(
              // `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=57bc76c343fa533771d9644a21e31052`
            )
          )
          
        );
        console.log(responses);

        const data: WeatherData[] = responses
          .map(res => {
            const d = res.data;
            if (
              d &&
              d.main &&
              typeof d.main.temp === "number" &&
              Array.isArray(d.weather) &&
              d.weather.length > 0 &&
              d.wind &&
              typeof d.wind.speed === "number" &&
              typeof d.name === "string"
            ) {
              return d as WeatherData;
            } else {
              console.warn("Invalid response structure for city:", d);
              return null;
            }
          })
          .filter((entry): entry is WeatherData => entry !== null);

        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  const isExtreme = (city: WeatherData) => {
    return city.wind.speed > 15 || city.weather[0].main === "Rain";
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" align="center" style={{ flexGrow: 1 }}>
            UK Weather Dashboard
          </Typography>
          <IconButton onClick={() => setDarkMode(prev => !prev)} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div>

        {loading ? (
          <Typography align="center">Loading weather data...</Typography>
        ) : (
          <>
            {weatherData.some(isExtreme) && (
              <Alert severity="warning" style={{ marginTop: "1rem" }}>
                ⚠️ Extreme weather detected in some cities!
              </Alert>
            )}
            <WeatherTable data={weatherData} />
            <WeatherCards data={weatherData} />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
