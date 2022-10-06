import React, { ChangeEvent } from "react";

const FormRowSelect = ({ labelText, name, value, handleChange, list }: any) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange(e)}
        className="form-select"
      >
        {list.map((itemValue: any, index: any) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
