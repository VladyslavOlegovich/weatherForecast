/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { cities } from "../../data/Data";
import classes from "./Modal.module.css";

export const Modal = ({ handleAddTrip, isOpen, setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    city: "",
    startDate: "",
    endDate: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "city") {
      const selectedCity = cities.find((city) => city.name === value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        imageUrl: selectedCity ? selectedCity.imageUrl : "",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddTrip(formData);
    setFormData({
      city: "",
      startDate: "",
      endDate: "",
    });
    setIsModalOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className={classes.overlay} onClick={closeModal}>
          <div className={classes.modal}>
            <div className={classes.formContainer}>
              <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.closeContainer}>
                  <p>Create trip</p>
                  <button onClick={closeModal}>X</button>
                </div>

                <label htmlFor="city">
                  <span>*</span> City
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="">Select a city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="startDate">
                  <span>*</span> Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
                <label htmlFor="endDate">
                  <span>*</span> End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
                <div className={classes.btnsContainer}>
                  <button type="button" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
