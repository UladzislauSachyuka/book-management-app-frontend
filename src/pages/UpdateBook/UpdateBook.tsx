import { useEffect, useState } from "react";
import InputGroup from "../../components/InputGroup";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./UpdateBook.module.css";
import authHeader from "../../services/authHeader";

const UpdateBook: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [readingStartDate, setReadingStartDate] = useState<Date>();
  const [readingEndDate, setReadingEndDate] = useState<Date>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/books/${id}`, { headers: authHeader() });
      const fetchedResult = response.data;
      setTitle(fetchedResult.title);
      setAuthor(fetchedResult.author);
      setReadingStartDate(fetchedResult.readingStartDate);
      setReadingEndDate(fetchedResult.readingEndDate);
    } catch (error) {
      console.error("Error fetching book: ", error);
    }
  }

  useEffect(() => {
    fetchBook();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');

    if (readingStartDate && readingEndDate && readingEndDate < readingStartDate) {
      setErrorMessage("End date cannot be earlier than start date.");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/books/${id}`, {
        title,
        author,
        readingStartDate,
        readingEndDate,
      },
      {
        headers: authHeader(),
      }
      );

      window.alert("Book successfully updated!");
      
      navigate("/home");
    } catch (error) {
      if (error instanceof Error) setErrorMessage(`${error.message}`);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.header}>Book App</h1>
      <div className={styles.inputContainer}>
        <h2 className={styles.inputContainerHeader}>Edit book</h2>
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
          <InputGroup
            id="endDate"
            type="date"
            labelText="Reading end date"
            onChange={setReadingEndDate}
            value={readingEndDate}
            className={styles.input}
          />
          <button type="submit" className={styles.submitButton}>
            Edit book
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

export default UpdateBook;
