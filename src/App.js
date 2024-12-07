import logo from './logo.svg';
import './App.css';
import Home from './components/MarketingPage'
import SignIn from './components/sign-in/SignIn'
import Dashboard from './components/dashboard/Dashboard'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignUp from './components/sign-up/SignUp';

function App() {
  return (
   <>
       <GoogleOAuthProvider clientId="602245044157-ir7guo8lloqf87497gfm52j73tbhud8m.apps.googleusercontent.com">

        <Router>
  

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
    </GoogleOAuthProvider>
   </>
  );
}

export default App;
