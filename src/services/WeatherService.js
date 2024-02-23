export const fetchWeatherDataForSingleDay = async (city, apiKey) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=${apiKey}&contentType=json`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export const fetchWeatherDataForPeriod = async (
  city,
  startDate,
  endDate,
  apiKey
) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data for multiple days:", error);
    return null;
  }
};
