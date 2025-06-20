import React from "react";
import { Box, Card, CardContent, Typography, CardMedia, Paper } from "@mui/material";
import { WeatherData } from "./WeatherDashboard";

interface Props {
  data: WeatherData[];
}

const WeatherCards: React.FC<Props> = ({ data }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        marginTop: "2rem",
        justifyContent: "center",
      }}
    >
      {data.map((city) => (
        <Box
          key={city.name}
          sx={{
            flex: "1 1 300px", // grow shrink basis - responsive cards roughly 300px wide
            maxWidth: 345,
          }}
        >
          <Card component={Paper} elevation={4}>
            <CardContent>
              <Typography variant="h6">{city.name}</Typography>
              <CardMedia
                component="img"
                height="60"
                image={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                alt={city.weather[0].description}
                sx={{ objectFit: "contain" }}
              />
              <Typography variant="body1">Temp: {city.main.temp}°F</Typography>
              <Typography variant="body2">Feels like: {city.main.feels_like}°F</Typography>
              <Typography variant="body2">Condition: {city.weather[0].main}</Typography>
              <Typography variant="body2">Humidity: {city.main.humidity}%</Typography>
              <Typography variant="body2">Wind: {city.wind.speed} m/s</Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default WeatherCards;
