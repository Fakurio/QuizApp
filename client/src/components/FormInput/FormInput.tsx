import toFirstLetterUppercase from "../../utils/first-letter-uppercase";
import "./FormInput.css";

interface FormInputProps {
  type: string;
  label: string;
  name: string;
  onFocus?: () => void;
}

const FormInput = ({ type, label, name, onFocus }: FormInputProps) => {
  return (
    <>
      <label htmlFor={label} className="form-input-label">
        {toFirstLetterUppercase(label)}
      </label>
      <input
        onFocus={onFocus}
        type={type}
        id={label}
        name={name}
        required
        className="form-input-field"
      />
    </>
  );
};

export default FormInput;
