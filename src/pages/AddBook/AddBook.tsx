import { useState } from "react";
import InputGroup from "../../components/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./AddBook.module.css";
import authHeader from "../../services/authHeader";

const AddBook: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [readingStartDate, setReadingStartDate] = useState<Date>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      await axios.post("http://localhost:8080/api/books/add", {
        title,
        author,
        readingStartDate,
      },
      {
        headers: authHeader(),
      }
      );

      window.alert("Book successfully added!");
      
      navigate("/home");
    } catch (error) {
      if (error instanceof Error) setErrorMessage(`${error.message}`);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.header}>Book App</h1>
      <div className={styles.inputContainer}>
        <h2 className={styles.inputContainerHeader}>Add book</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <span className={styles.errorMessage}>{errorMessage}</span>
          <InputGroup
            id="title"
            type="text"
            labelText="Title"
            onChange={setTitle}
            value={title}
            className={styles.input}
          />
          <InputGroup
            id="author"
            type="text"
            labelText="Author"
            onChange={setAuthor}
            value={author}
            className={styles.input}
          />
          <InputGroup
            id="startDate"
            type="date"
            labelText="Reading start date"
            onChange={setReadingStartDate}
            value={readingStartDate}
            className={styles.input}
          />
          <button type="submit" className={styles.submitButton}>
            Add book
          </button>
        </form>
      </div>
      <div className={styles.line}></div>
      <Link to="/home" className={styles.backButton}>
        Back to home page
      </Link>
    </div>
  );
}

export default AddBook;