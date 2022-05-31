import Nav from './Nav';
import classes from '../styles/Layout.module.css';
import FloatingButton from './FloatingButton';
import { useAuthContext } from '../contexts/AuthContext';
import { useUserContext } from '../contexts/UserContext';

export default function Layout({ children }) {
  const { currentUser } = useAuthContext();
  const { showPostButton } = useUserContext();

  return (
    <>
      <Nav />
      <main className={classes.main}>
        <div className={classes.container}>{children}</div>
      </main>
      {currentUser && showPostButton && <FloatingButton />}
    </>
  );
}
