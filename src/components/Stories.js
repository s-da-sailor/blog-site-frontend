import classes from '../styles/Stories.module.css';
import React, { useState, useEffect } from 'react';
import Story from './Story';
import { Link } from 'react-router-dom';
import { useStoryContext } from '../contexts/StoryContext';
import Pagination from './Pagination';
import Loader from './Loader';

export default function Stories() {
  const { findAllStories } = useStoryContext();
  const [currentStories, setCurrentStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [storiesPerPage] = useState(3);
  const [totalStories, setTotalStories] = useState();

  useEffect(() => {
    const getAllStories = async () => {
      try {
        setLoading(true);
        const allStories = await findAllStories(currentPage, storiesPerPage);
        setCurrentStories(allStories.data.data);
        setTotalStories(allStories.data.totalRecords);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(err.response.data);
      }
    };
    getAllStories();
  }, [findAllStories, currentPage, storiesPerPage]);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {!loading && currentStories.length > 0 && (
        <div className={classes.storiesContainer}>
          <div className={classes.stories}>
            {currentStories &&
              currentStories.length &&
              currentStories.map((story) => (
                <Link to={`/stories/${story.blogId}`} key={story.blogId} className="current-user">
                  <Story
                    title={story.title}
                    description={story.description}
                    author={story.authorUsername}
                    updatedAt={new Date(story.updatedAt).toUTCString()}
                    createdAt={new Date(story.createdAt).toUTCString()}
                  />
                </Link>
              ))}
          </div>
          <Pagination
            totalPosts={totalStories}
            postsPerPage={storiesPerPage}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
      {!loading && currentStories.length === 0 && (
        <div className={classes.noStories}>
          <h1>No blog found!</h1>
        </div>
      )}
      {error && <p className="error">{error}</p>}
      {loading && <Loader />}
    </>
  );
}
