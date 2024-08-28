import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import FormInput from "../FormInput/FormInput";
import "./LoginForm.css";
import { useAuth } from "../../contexts/AuthContext";
import { InfoBox } from "../InfoBox/InfoBox";

const LoginForm = () => {
  const { login, error, setError } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const user = await login(email, password);
    if (user) {
      navigate("/");
    }
  };

  return (
    <form className="login-form" onSubmit={(e) => handleLogin(e)}>
      <fieldset className="login-form__section">
        <FormInput
          type="email"
          label="email"
          name="email"
          onFocus={() => setError(null)}
        />
      </fieldset>
      <fieldset className="login-form__section">
        <FormInput
          type="password"
          name="password"
          label="password"
          onFocus={() => setError(null)}
        />
      </fieldset>
      <p className="login-form__paragraph">
        Don't have an account?
        <Link to="/register"> Register</Link>
      </p>
      {error && (
        <InfoBox type="error" text={error} className="login-form__error" />
      )}
      <fieldset className="login-form__section login-form__section--buttons">
        <Button text="Login" type="submit" />
        <hr />
        <Button text="Login with Google" />
      </fieldset>
    </form>
  );
};

export default LoginForm;
