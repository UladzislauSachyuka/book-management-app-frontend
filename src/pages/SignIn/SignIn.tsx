import { useState } from 'react';
import InputGroup from '../../components/InputGroup';
import styles from './SignIn.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post("http://localhost:8080/api/auth/signin", {
        username,
        password
      });

      const user = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      
      navigate("/home");
    } catch (error) {
      if (error instanceof Error) setErrorMessage(`${error.message}`);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.header}>Book App</h1>
      <div className={styles.inputContainer}>
        <h2 className={styles.inputContainerHeader}>Sign in</h2>
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
            id="password"
            type="password"
            labelText="Password"
            onChange={setPassword}
            value={password}
            className={styles.input}
          />
          <button type="submit" className={styles.submitButton}>
            Log in
          </button>
        </form>
      </div>
      <div className={styles.line}>
        <span className={styles.lineText}>New to our community</span>
      </div>
      <Link to="/registration" className={styles.createAccountButton}>
        Sign up
      </Link>
    </div>
  );
};

export default SignIn;
