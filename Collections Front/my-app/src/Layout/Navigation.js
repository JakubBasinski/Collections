import React, { useContext } from 'react';
import AuthorizationContext from '../store/authorization-context';
import { AppBar, Typography, Toolbar, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import * as cls from './NavigationSx';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';
import DataContext from '../store/data-context';
import infoLogo from '../assets/info.png';
import infoPdf from '../assets/info.pdf';

const Navbar = () => {
  const dataCtx = useContext(DataContext);
  const authCtx = useContext(AuthorizationContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const isAdmin = authCtx.isAdmin;
  const userId = localStorage.getItem('userId');
  const logoutHandler = () => {
    authCtx.logout();
  };
  const { theme, setThemeController } = dataCtx;

  return (
    <React.Fragment>
      <AppBar
        position="static"
        sx={{
          borderBottom: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          backgroundColor: 'transparent',
          fontFamily: 'Quicksand',
        }}
      >
        <Toolbar color="#eeeee">
          <CatchingPokemonIcon sx={cls.navIcon} />

          <a href={infoPdf} target="_blank">
            <img
              src={infoLogo}
              alt=""
              style={{
                height: '3rem',
                with: 'auto',
                position: 'fixed',
                top: ' 5rem',
                right: '2rem',
                '&:hover' : {
                  backgroundColor:'white'
                }
              }}
            />
          </a>

          <Typography variant="h5" component="div" sx={cls.navHeader}>
            Collections
          </Typography>

          <Stack direction="row" spacing={3} alignItems="center">
            {theme === 'light' ? (
              <NightsStayIcon
                onClick={() => {
                  setThemeController('dark');
                }}
                sx={{
                  color: '#c9c9c9',
                  padding: 0,
                  fontSize: 30,
                  '&:hover': {
                    cursor: 'pointer',
                    transition: 'all 0.3s ease 0s',
                    transform: 'translateY(-1px)',
                    transformOrigin: 'bottom left ',
                  },
                }}
              />
            ) : (
              <LightModeIcon
                onClick={() => {
                  setThemeController('light');
                }}
                sx={{
                  color: '#DAB220',
                  padding: 0,
                  fontSize: 30,
                  '&:hover': {
                    cursor: 'pointer',
                    transition: 'all 0.3s ease 0s',
                    transform: 'translateY(-1px)',
                    transformOrigin: 'bottom left ',
                  },
                }}
              />
            )}

            {isAdmin && (
              <NavLink
                to="/panel"
                style={({ isActive }) => (isActive ? cls.activeLink : cls.link)}
              >
                Admin Panel
              </NavLink>
            )}

            {isLoggedIn && (
              <NavLink
                to={`/profile/${userId}/list`}
                style={({ isActive }) => (isActive ? cls.activeLink : cls.link)}
              >
                Profile
              </NavLink>
            )}

            <NavLink
              to={'/collections'}
              style={({ isActive }) => (isActive ? cls.activeLink : cls.link)}
            >
              Collections
            </NavLink>

            <NavLink
              to={'/items'}
              style={({ isActive }) => (isActive ? cls.activeLink : cls.link)}
            >
              Items
            </NavLink>

            <NavLink
              to={'/'}
              end
              style={({ isActive }) => (isActive ? cls.activeLink : cls.link)}
            >
              Main Page
            </NavLink>

            {isLoggedIn && (
              <NavLink onClick={logoutHandler} style={cls.link}>
                Logout
              </NavLink>
            )}

            {!isLoggedIn && (
              <NavLink
                to={'/Login'}
                style={({ isActive }) => (isActive ? cls.activeLink : cls.link)}
              >
                Login
              </NavLink>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Navbar;
