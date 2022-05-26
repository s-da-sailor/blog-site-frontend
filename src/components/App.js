import '../styles/App.css';
import Layout from './Layout';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import StoryDetails from './pages/StoryDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StoryContextProvider } from '../contexts/storyContext';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
