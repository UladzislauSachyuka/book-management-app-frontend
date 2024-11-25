import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputGroup from '../../components/InputGroup';
import styles from "./SignUp.module.css";
import axios from "axios";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      await axios.post("http://localhost:8080/api/auth/signup", {
        username,
        email,
        password
      });

      navigate("/login");
    } catch (error) {
      if (error instanceof Error) setErrorMessage(`${error.message}`);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.header}>Book App</h1>
      <div className={styles.inputContainer}>
        <h2 className={styles.inputContainerHeader}>Sign up</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <span className={styles.errorMessage}>{errorMessage}</span>
          <InputGroup
            id="username"
            type="text"
            labelText="Username"
            onChange={setUsername}
            value={username}
            className={styles.input}
          />
          <InputGroup
            id="email"
            type="email"
            labelText="Email"
            onChange={setEmail}
            value={email}
            className={styles.input}
          />
          <InputGroup
            id="password"
            type="password"
            labelText="Password"
            onChange={setPassword}
            value={password}
            className={styles.input}
          />
          <button type="submit" className={styles.submitButton}>
            Sign up
          </button>
        </form>
      </div>
      <div className={styles.line}>
        <span className={styles.lineText}>Already have an account?</span>
      </div>
      <Link to="/login" className={styles.loginButton}> 
        Log in
      </Link>
    </div>
  );
};

export default SignUp;