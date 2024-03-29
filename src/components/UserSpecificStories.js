import classes from '../styles/Stories.module.css';
import React, { useState, useEffect } from 'react';
import Story from './Story';
import { Link } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import Pagination from './Pagination';
import Loader from './Loader';

export default function UserSpecificStories({ username }) {
  const { findUserSpecificStories } = useUserContext();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [storiesPerPage] = useState(12);

  useEffect(() => {
    const getAllStories = async () => {
      try {
        setLoading(true);
        const allStories = await findUserSpecificStories(username);
        setStories(allStories.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(err.response.data.message);
      }
    };
    getAllStories();
  }, [findUserSpecificStories, username]);

  // Get current stories
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = stories.slice(indexOfFirstStory, indexOfLastStory);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div>
        {!loading && stories.length > 0 && (
          <div className={classes.stories}>
            {stories &&
              stories.length &&
              currentStories.map((story) => (
                <Link to={`/stories/${story.id}`} key={story.id} className="current-user">
                  <Story
                    title={story.title}
                    description={story.description}
                    author={story.author}
                    updatedAt={new Date(story.updatedAt).toUTCString()}
                    createdAt={new Date(story.createdAt).toUTCString()}
                  />
                </Link>
              ))}
          </div>
        )}
        <Pagination
          totalPosts={stories.length}
          postsPerPage={storiesPerPage}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>

      {!loading && stories.length === 0 && (
        <div className={classes.noStories}>
          <h1>No blog found!</h1>
        </div>
      )}
      {error && <p className="error">{error}</p>}
      {loading && <Loader />}
    </>
  );
}
