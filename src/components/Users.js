import classes from '../styles/Users.module.css';
import { useUserContext } from '../contexts/UserContext';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Pagination from './Pagination';
import Loader from './Loader';

export default function Users() {
  const { query } = useParams();
  const { searchUser } = useUserContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const allUsers = await searchUser(query);
        setUsers(allUsers.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(err.response.data.message);
      }
    };
    getAllUsers();
  }, [searchUser, query]);

  // Get current stories
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {!loading && users.length > 0 && (
        <div className={classes.usersContainer}>
          <div className={classes.users}>
            {users &&
              users.length &&
              currentUsers.map((user) => (
                <Link to={`/users/${user.username}`} key={user.username} className="current-user">
                  <h3 className={classes.user}>{user.username}</h3>
                </Link>
              ))}
          </div>
          <Pagination
            totalPosts={users.length}
            postsPerPage={usersPerPage}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
      {!loading && users.length === 0 && (
        <div className={classes.noUsers}>
          <h1>No user found!</h1>
        </div>
      )}
      {error && <p className="error">{error}</p>}
      {loading && <Loader />}
    </>
  );
}
