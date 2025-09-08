import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import formConfig from "../../formConfig";
import "./Data.css";

const Data = () => {
  const formdata = useSelector((state) => state.form.data);
  const navigate = useNavigate();

  return (
    <div className="dataContainer">
      <h2>Submitted Data</h2>
      {formdata.length === 0 ? (
        <h3>No submissions yet</h3>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              {formConfig.map((field) => (
                <th key={field.id}>{field.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {formdata.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.id}</td>
                {formConfig.map((field) => (
                  <td key={field.id}>
                    {Array.isArray(sub[field.id])
                      ? sub[field.id].join(", ")
                      : sub[field.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
};

export default Data;
