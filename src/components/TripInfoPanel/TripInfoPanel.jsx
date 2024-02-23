/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchWeatherDataForSingleDay } from "../../services/WeatherService";
import { GetWeekDay, getIcon } from "../../utils/GetWeekDay";
import { API_KEY, weatherIcons } from "../../data/Data";
import classes from "./TripInfoPanel.module.css";

export const TripInfoPanel = ({ selectedTrip }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [timer, setTimer] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    if (selectedTrip) {
      fetchWeatherDataForSingleDay(selectedTrip.city, API_KEY)
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });

      const intervalId = setInterval(() => {
        const startDate = new Date(selectedTrip.startDate).getTime();
        const now = new Date().getTime();
        const difference = startDate - now;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimer({ days, hours, minutes, seconds });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [selectedTrip]);

  useEffect(() => {
    if (weatherData) {
      const iconData = getIcon(weatherIcons, weatherData.days[0].icon);
      if (iconData) {
        setIcon(iconData.iconUrl);
      } else {
        setIcon(null);
      }
    } else {
      setIcon(null);
    }
  }, [weatherData]);

  return (
    <div className={classes.tripInfoContainer}>
      {selectedTrip && (
        <>
          {weatherData && (
            <div className={classes.contentContainer}>
              <div className={classes.contentInfoContainer}>
                <p className={classes.day}>
                  {GetWeekDay(weatherData.days[0].datetime)}
                </p>
                <div className={classes.weatherInfo}>
                  <img src={icon} alt="icon" className={classes.icon} />
                  <p>
                    {weatherData.days[0].temp}
                    <sup>&#176;C</sup>
                  </p>
                </div>
                <p>{weatherData.address}</p>
              </div>

              {timer && (
                <div className={classes.timerContainer}>
                  <div>
                    <p className={classes.strong}>{timer.days}</p>
                    <p>Days</p>
                  </div>
                  <div>
                    <p className={classes.strong}>{timer.hours}</p>
                    <p>Hours</p>
                  </div>
                  <div>
                    <p className={classes.strong}>{timer.minutes}</p>
                    <p>Minutes</p>
                  </div>
                  <div>
                    <p className={classes.strong}>{timer.seconds}</p>
                    <p>Seconds</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
