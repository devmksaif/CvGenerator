import * as React from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import ModelCv from './components/ModelCv';
import SideMenu from './components/SideMenu';
import AppTheme from '../../shared-theme/AppTheme';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';
import { useNavigate } from 'react-router-dom';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  const navigate = useNavigate();
  const [tokenTime, setTokenTime] = React.useState(null);
  async function fetchGoogleUserData(accessToken) {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {

        return response.json()
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      console.log(userData); // Contains user information (e.g., email, name, picture)
      return userData;

    } catch (error) {

      console.error('Error fetching Google user data:', error);
      return null;
    }
  }
  // Function to check if the token has expired
  const checkTime = () => {
    const tokenTimeGet = new Date(Date.now() + parseInt(tokenTime) * 1000);
    const currentTime = new Date();
    if (currentTime >= tokenTimeGet) {
      Cookies.remove('authToken');
      Cookies.remove('expiry');
      navigate('/signin');
    } else {
      console.log('Token still valid');
    }
  };
 

  // Example of correct useEffect usage with dependency array
  React.useEffect(() => {
    const token = Cookies.get("authToken");
    const authType = Cookies.get("authType")
    if (!token) {
      navigate("/signin");
    } else if (token && authType === "google") {
      fetchGoogleUserData(token).then(
        (data) => {
          if (data.email) {

            setTokenTime(Cookies.get("expiry"));
            const checkTimeInterval = setInterval(() => {
              checkTime();  // Ensure `checkTime` is stable and does not change on each render
            }, 60000);
          } else {
            if (data.error_description.includes('Invalid Credentials') || data.error('invalid_request')) {
              Cookies.remove("authToken")
              Cookies.remove("expiry")
              Cookies.remove('authType')
              navigate("/signin")
              return;
            }
          }


        }
      )

    }






  }, [navigate]);  // Make sure these dependencies are correct and stable


  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <ModelCv />
          </Stack>
        </Box>
      </Box>
      <ToastContainer />
    </AppTheme>
  );
}
