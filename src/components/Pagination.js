import React from 'react';
import classes from '../styles/Pagination.module.css';

const Pagination = ({ totalPosts, postsPerPage, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={classes.pagination}>
        {pageNumbers.map((number) => {
          if (number === currentPage) {
            return (
              <li key={number} className={classes.selectedPage}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    paginate(number);
                  }}
                  href="!#"
                  className={classes.pageLink}
                >
                  {number}
                </a>
              </li>
            );
          } else {
            return (
              <li key={number} className={classes.pageItem}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    paginate(number);
                  }}
                  href="!#"
                  className={classes.pageLink}
                >
                  {number}
                </a>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
