/* eslint-disable no-unused-vars */
import "./App.css";
import { Modal } from "./components/Modal/Modal";
import SearchInput from "./components/SearchInput/SearchInput";
import { TripCardList } from "./components/TripCardList/TripCardList";
import { useState, useEffect, useMemo } from "react";
import { TripInfoPanel } from "./components/TripInfoPanel/TripInfoPanel";
import { TripWeatherForecast } from "./components/TripWeatherForecast/TripWeatherForecast";
import { fetchWeatherDataForPeriod } from "./services/WeatherService";
import { initialTrips, cities } from "./data/Data";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trips, setTrips] = useState(initialTrips);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTrips = useMemo(() => {
    if (!searchTerm) {
      return trips;
    }
    return trips.filter((trip) => {
      return trip.city.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, trips]);

  const handleSelectTrip = async (selected) => {
    setSelectedTrip(selected);
    const forecast = await fetchWeatherDataForPeriod(selected.city);
    setWeatherForecast(forecast);
  };

  const handleAddTrip = (trip) => {
    setTrips([...trips, trip]);
    setIsModalOpen(false);
  };

  useEffect(() => {}, [trips]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="main">
          <h1 className="header">Weather Forecast</h1>
          <SearchInput onSearch={handleSearch} />
          <TripCardList
            trips={filteredTrips}
            handleSelectTrip={handleSelectTrip}
            selected={selectedTrip}
          />

          {isModalOpen && (
            <Modal
              handleAddTrip={handleAddTrip}
              isOpen={isModalOpen}
              setOpen={setIsModalOpen}
            />
          )}

          <TripWeatherForecast selectedTrip={selectedTrip} />
        </div>
        <div className="btn-container">
          <button className="btn" onClick={() => setIsModalOpen(true)}>
            Add trip
          </button>
        </div>
        <div className="side">
          <TripInfoPanel selectedTrip={selectedTrip} />
        </div>
      </div>
    </div>
  );
}

export default App;
