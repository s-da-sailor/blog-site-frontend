import classes from '../styles/Users.module.css';
import { useUserContext } from '../contexts/UserContext';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Pagination from './Pagination';
import Loader from './Loader';

export default function Users() {
  const { query } = useParams();
  const { searchUser } = useUserContext();
  const [currentUsers, setCurrentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const allUsers = await searchUser(query, currentPage, usersPerPage);
        setCurrentUsers(allUsers.data.data);
        setTotalUsers(allUsers.data.totalRecords);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(err.response.data);
      }
    };
    getAllUsers();
  }, [searchUser, query, currentPage, usersPerPage]);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {!loading && currentUsers.length > 0 && (
        <div className={classes.usersContainer}>
          <div className={classes.users}>
            {currentUsers &&
              currentUsers.length &&
              currentUsers.map((user) => (
                <Link to={`/users/${user.userId}`} key={user.userId} className="current-user">
                  <h3 className={classes.user}>{user.username}</h3>
                </Link>
              ))}
          </div>
          <Pagination
            totalPosts={totalUsers}
            postsPerPage={usersPerPage}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
      {!loading && currentUsers.length === 0 && (
        <div className={classes.noUsers}>
          <h1>No user found!</h1>
        </div>
      )}
      {error && <p className="error">{error}</p>}
      {loading && <Loader />}
    </>
  );
}
