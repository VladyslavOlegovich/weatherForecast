/* eslint-disable react/prop-types */
import classes from "./TripCard.module.css";

export const TripCard = ({ trip, handleClick, selected }) => {
  return (
    <div
      className={`${classes.tripCard} ${
        selected === trip ? classes.selected : ""
      }`}
      onClick={handleClick}
    >
      <img className={classes.img} src={trip.imageUrl} alt={trip.city} />
      <div className={classes.tripCardContent}>
        <h3>{trip.city}</h3>
        <p>
          {trip.startDate} - {trip.endDate}
        </p>
      </div>
    </div>
  );
};
