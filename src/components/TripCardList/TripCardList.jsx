/* eslint-disable react/prop-types */
import { TripCard } from "../TripCard/TripCard";
import classes from "./TripCardList.module.css";

export const TripCardList = ({ trips, handleSelectTrip, selected }) => {
  return (
    <div className={classes.tripListContainer}>
      <div className={classes.list}>
        {trips.map((trip) => (
          <TripCard
            trip={trip}
            key={trip.id}
            selected={selected}
            handleClick={() => handleSelectTrip(trip)}
          />
        ))}
      </div>
    </div>
  );
};
