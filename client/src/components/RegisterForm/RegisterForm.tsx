import "./RegisterForm.css";
import FormInput from "../FormInput/FormInput";
import { InfoBox } from "../InfoBox/InfoBox";
import Button from "../Button/Button";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const { error, setError, register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const username = e.currentTarget.username.value;
    const password = e.currentTarget.password.value;
    const response = await register(email, username, password);
    if (response) {
      navigate("/login");
    }
  };

  return (
    <form className="register-form" onSubmit={(e) => handleRegister(e)}>
      <fieldset className="register-form__section">
        <FormInput
          type="email"
          label="email"
          name="email"
          onFocus={() => setError(null)}
        />
      </fieldset>
      <fieldset className="register-form__section">
        <FormInput
          type="text"
          label="username"
          name="username"
          onFocus={() => setError(null)}
        />
      </fieldset>
      <fieldset className="register-form__section">
        <FormInput
          type="password"
          name="password"
          label="password"
          onFocus={() => setError(null)}
        />
      </fieldset>
      {Array.isArray(error)
        ? error.map((err, index) => (
            <InfoBox
              key={index}
              type="error"
              text={err}
              className="register-form__error"
            />
          ))
        : error && (
            <InfoBox
              type="error"
              text={error}
              className="register-form__error"
            />
          )}
      <fieldset className="register-form__section register-form__section--buttons">
        <Button text="Register" type="submit" />
      </fieldset>
    </form>
  );
};

export default RegisterForm;
