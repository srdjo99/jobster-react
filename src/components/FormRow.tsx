import React, { FC, ReactElement } from "react";

interface IFormRowProps {
  type: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormRow: FC<IFormRowProps> = ({
  type,
  name,
  value,
  handleChange,
}): ReactElement => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
