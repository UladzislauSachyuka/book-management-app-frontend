import { useNavigate } from "react-router-dom";
import axios from "axios";
import authHeader from "../../services/authHeader";
import { Card } from "../../types";

import styles from "./BookCard.module.css";

interface BookCardProps extends Card {
  onDelete: (id: number) => void;
}

const BookCard: React.FC<BookCardProps> = ({ id, title, author, readingStartDate, readingEndDate, onDelete }) => {
  const navigate = useNavigate();

  const deleteBook = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/books/${id}`, { headers: authHeader() });
      onDelete(id);
    } catch (error) {
      console.error("Error deleting book: ", error);
    }
  }

  return (
    <div className={styles.bookCard}>
      <h3 className={styles.bookTitle}>{title}</h3>
      <span>Author: {author}</span>
      <span>Start reading: {readingStartDate}</span>
      <span>End reading: {readingEndDate || "Unknown"}</span>
      <div className={styles.buttonsContainer}>
        <button className={styles.button} onClick={() => navigate(`/updateBook/${id}`)}>Edit</button>
        <button className={styles.button} onClick={() => deleteBook()}>Delete</button>
      </div>
    </div>
  );
};

export default BookCard;
