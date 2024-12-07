import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SelectContent from './SelectContent';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';
import OptionsMenu from './OptionsMenu';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  const [token, setToken] = React.useState('')
  const [userData, setUserData] = React.useState({})
  const navigate = useNavigate()
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


  React.useEffect(() => {
    const getToken = Cookies.get('authToken')
    const authType = Cookies.get('authType')
    if (getToken && authType == "google") {
      fetchGoogleUserData(getToken).then(
        (data) => {
          if (data.email) {
            setUserData(data);
          } else {
            if (data.error_description.includes('Invalid Credentials') || data.error('invalid_request')) {
              Cookies.remove("authToken")
              Cookies.remove("expiry")
              navigate("/signin")
            }
          }


        }
      )
    }else if(getToken && authType =="login")
    {
      const options = {
        method : "POST",
        headers : {
          "Content-type" : "application/json",
          Accept : "application/json"
        },
        body : JSON.stringify({
          "token" : getToken,
        })
      }
      fetch("http://localhost:5000/get_user",options).then(
        (response) => response.json()
      ).then(
        (data) => {
          setUserData(data)
          console.log(data)
        }
      )
    }

  },[])



  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >

      <Divider />
      <MenuContent />

      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt="Riley Carter"
          src={userData.picture}
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            {
              userData.name
            }
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {
              userData.email
            }
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
