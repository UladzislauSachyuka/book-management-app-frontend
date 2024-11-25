import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BookCard from "../../components/BookCard";
import { Card } from "../../types";
import authHeader from "../../services/authHeader";
import axios from "axios";

import styles from "./Home.module.css";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Card[]>([]);
  const [noData, setNoData] = useState(false);

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [endDateFilter, setEndDateFilter] = useState<string>("");
  const [titleFilter, setTitleFilter] = useState<string>("");

  const [sortField, setSortField] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const fetchBooks = async () => {
    try {
      let response;

      if (sortField) {
        response = await axios.get(`http://localhost:8080/api/books/sort/${sortField}`, {
          headers: authHeader(),
          params: { order: sortOrder },
        });
      } else if (statusFilter !== "all") {
        response = await axios.get("http://localhost:8080/api/books/filter/status", {
          headers: authHeader(),
          params: { status: statusFilter },
        });
      } else if (endDateFilter) {
        response = await axios.get("http://localhost:8080/api/books/filter/date", {
          headers: authHeader(),
          params: { endDate: endDateFilter },
        });
      } else if (titleFilter) {
        response = await axios.get("http://localhost:8080/api/books/filter/title", {
          headers: authHeader(),
          params: { title: titleFilter },
        });
      } else {
        response = await axios.get("http://localhost:8080/api/books", {
          headers: authHeader(),
        });
      }

      const fetchedResults = response.data;
      setBooks(fetchedResults);
      setNoData(response.status === 204);
    } catch (error) {
      console.error("Error fetching books: ", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [statusFilter, endDateFilter, titleFilter, sortField, sortOrder]);

  const handleLogOut = () => {
    localStorage.removeItem("user");
  };

  const handleDelete = (id: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.logOutContainer}>
        <Link to="/login" className={styles.logOutLink} onClick={() => handleLogOut()}>Log out</Link>
      </div>
      <h2 className={styles.header}>Book Management</h2>
      <button onClick={() => navigate("/addBook")}>Add Book</button>

      <div className={styles.filtersContainer}>
        <label>
          Status:
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="not-read">Not Read</option>
          </select>
        </label>

        <label>
          End Date:
          <input
            type="date"
            value={endDateFilter}
            onChange={(e) => setEndDateFilter(e.target.value)}
          />
        </label>

        <label>
          Title:
          <input
            type="text"
            placeholder="Search by title"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
          />
        </label>

        <label>
          Sort By:
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="">None</option>
            <option value="startDate">Start Date</option>
            <option value="endDate">End Date</option>
          </select>
        </label>

        <label>
          Order:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      {noData ? (
        <h2 className={styles.header}>No books found</h2>
      ) : (
        <div className={styles.gridContainer}>
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              readingStartDate={book.readingStartDate}
              readingEndDate={book.readingEndDate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
