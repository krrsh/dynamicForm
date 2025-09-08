import React, { useState } from "react";
import "./Homepage.css";
import { useDispatch } from "react-redux";
import { setFromdata } from "../../Redux/Slice";
import { useNavigate } from "react-router";
import  formConfig  from "../../formConfig";

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = formConfig.reduce((acc, field) => {
    if (field.type === "checkbox") {
      acc[field.id] = [];
    } else {
      acc[field.id] = "";
    }
    return acc;
  }, {});

  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validateField = (id, value, field) => {
    let error = "";
    if (
      field.required &&
      (value === "" || (Array.isArray(value) && value.length === 0))
    ) {
      error = `${field.label} is required`;
    }
    if (field.type === "email" && value) {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(value)) error = "Invalid email format";
    }
    if (field.type === "number" && field.min && value) {
      if (Number(value) < field.min)
        error = `${field.label} must be ≥ ${field.min}`;
    }
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    let newErrors = {};
    formConfig.forEach((field) => {
      const error = validateField(field.id, data[field.id], field);
      if (error) {
        valid = false;
        newErrors[field.id] = error;
      }
    });
    setErrors(newErrors);
    if (!valid) return;

    dispatch(setFromdata(data));
    setData(initialState);
    navigate("/data");
  };

  const handleChange = (e, field) => {
    const { name, value, type, checked } = e.target;
    let newValue;
    if (field.type === "checkbox") {
      if (checked) {
        newValue = [...data[name], value];
      } else {
        newValue = data[name].filter((v) => v !== value);
      }
    } else {
      newValue = value;
    }
    setData((prev) => ({ ...prev, [name]: newValue }));
    const error = validateField(name, newValue, field);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const isFormValid = Object.values(errors).every((err) => !err);

  return (
    <div className="formContainer">
      <h2>Dynamic Form</h2>
      <form onSubmit={handleSubmit}>
        {formConfig.map((field) => (
          <div key={field.id} className="formGroup">
            <label>{field.label}:</label>

            {field.type === "text" ||
            field.type === "email" ||
            field.type === "number" ? (
              <input
                type={field.type}
                name={field.id}
                value={data[field.id]}
                onChange={(e) => handleChange(e, field)}
              />
            ) : field.type === "select" ? (
              <select
                name={field.id}
                value={data[field.id]}
                onChange={(e) => handleChange(e, field)}
              >
                <option value="">-- Select {field.label} --</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : field.type === "radio" ? (
              field.options.map((opt) => (
                <label key={opt}>
                  <input
                    type="radio"
                    name={field.id}
                    value={opt}
                    checked={data[field.id] === opt}
                    onChange={(e) => handleChange(e, field)}
                  />
                  {opt}
                </label>
              ))
            ) : field.type === "checkbox" ? (
              field.options.map((opt) => (
                <label key={opt}>
                  <input
                    type="checkbox"
                    name={field.id}
                    value={opt}
                    checked={data[field.id].includes(opt)}
                    onChange={(e) => handleChange(e, field)}
                  />
                  {opt}
                </label>
              ))
            ) : null}

            {errors[field.id] && (
              <span className="error">{errors[field.id]}</span>
            )}
          </div>
        ))}

        <button type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Homepage;
