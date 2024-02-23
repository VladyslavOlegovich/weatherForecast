/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { fetchWeatherDataForPeriod } from "../../services/WeatherService";
import { GetWeekDay, getIcon } from "../../utils/GetWeekDay";
import { API_KEY, weatherIcons } from "../../data/Data";
import classes from "./TripWeatherForecast.module.css";

export const TripWeatherForecast = ({ selectedTrip }) => {
  const [weatherForecast, setWeatherForecast] = useState(null);

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      try {
        if (!selectedTrip) return;

        const { city, startDate, endDate } = selectedTrip;

        if (!startDate || !endDate) return;

        const data = await fetchWeatherDataForPeriod(
          city,
          startDate,
          endDate,
          API_KEY
        );
        setWeatherForecast(data);
      } catch (error) {
        console.error("Error fetching weather forecast:", error);
      }
    };

    fetchWeatherForecast();
  }, [selectedTrip]);

  return (
    <div>
      <h2>Weather Forecast</h2>
      <div className={classes.dayContainer}>
        {weatherForecast &&
          weatherForecast.days.map((day) => (
            <div className={classes.day} key={day.datetime}>
              <p className={classes.gray}>{GetWeekDay(day.datetime)}</p>
              {day.icon && (
                <>
                  <img
                    src={getIcon(weatherIcons, day.icon).iconUrl}
                    alt="Weather Icon"
                  />
                  <p>
                    {day.tempmax}
                    <sup>&#176;</sup>/{day.tempmin} <sup>&#176;</sup>
                  </p>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
