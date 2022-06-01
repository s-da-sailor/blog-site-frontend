import '../styles/App.css';
import Layout from './Layout';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import StoryDetails from './pages/StoryDetails';
import Profile from './pages/Profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StoryContextProvider } from '../contexts/StoryContext';
import { AuthContextProvider } from '../contexts/AuthContext';
import { UserContextProvider } from '../contexts/UserContext';
import StoryPost from './pages/StoryPost';
import StoryUpdate from './pages/StoryUpdate';
import ProfileUpdate from './pages/ProfileUpdate';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <UserContextProvider>
          <StoryContextProvider>
            <Layout>
              <Routes>
                <Route exact path="/" element={<Home />}></Route>
                <Route exact path="/signup" element={<Signup />}></Route>
                <Route exact path="/login" element={<Login />}></Route>
                <Route exact path="/stories" element={<StoryPost />}></Route>
                <Route exact path="/stories/:id" element={<StoryDetails />}></Route>
                <Route exact path="/stories/:id/edit" element={<StoryUpdate />}></Route>
                <Route exact path="/users/:username" element={<Profile />}></Route>
                <Route exact path="/users/:username/edit" element={<ProfileUpdate />}></Route>
              </Routes>
            </Layout>
          </StoryContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
