import React, { FC, ReactElement } from "react";

interface IFormRowProps {
  type: string;
  name: string;
  value?: string;
  labelText?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormRow: FC<IFormRowProps> = ({
  type,
  name,
  value,
  labelText,
  handleChange,
}): ReactElement => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText ?? name}
      </label>
      <input
        id={name}
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
