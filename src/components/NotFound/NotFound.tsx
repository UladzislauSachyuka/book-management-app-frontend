import { Link } from "react-router-dom";

import styles from "./NotFound.module.css";

const NotFound: React.FC = () => {
  return (
    <div className={styles.content}>
      <h1>404 - Page Not Found</h1>
      <Link to="/login" className={styles.loginLink}>Log in</Link>
    </div>
  );
};

export default NotFound;
