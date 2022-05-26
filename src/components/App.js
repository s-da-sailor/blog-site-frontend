import '../styles/App.css';
import Layout from './Layout';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import StoryDetails from './pages/StoryDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StoryContextProvider } from '../contexts/StoryContext';
import { AuthContextProvider } from '../contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <StoryContextProvider>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/stories/:id" element={<StoryDetails />}></Route>
            </Routes>
          </Layout>
        </StoryContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
