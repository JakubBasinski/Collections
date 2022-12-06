import React, { useEffect, useContext } from 'react';
import './App.css';
import Layout from './Layout/Layout';
import AdminPage from './pages/Admin/AdminPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/Main/MainPage';
import AuthForm from './pages/Auth/AuthForm';
import UserPage from './pages/User/UserPage';
import CollectionsPage from './pages/Collections/CollectionsPage';
import SingleCollection from './pages/Collections/SingleCollection';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { StyledEngineProvider } from '@mui/material';
import DataContext from './store/data-context';
import AllItems from './pages/Items/AllItems';
import SingleItem from './pages/Items/SingleItem';
import axios from 'axios';
import AuthorizationContext from './store/authorization-context';
import { lighTheme } from './theme';

function App() {
  const authCtx = useContext(AuthorizationContext);
  const dataCtx = useContext(DataContext);
  const { refetchValue } = dataCtx;
  const { theme } = dataCtx;

  useEffect(() => {
    let url = process.env.REACT_APP_URL;
    dataCtx.setLoadingState(true);
    axios
      .get(`${url}/getAll`)
      .then((res) => {
        console.log('refetecj');
        const data = res.data;
        if (data) {
          dataCtx.setCollections(data.updatedCollection);
          dataCtx.setItems(data.items);
          dataCtx.setLargestCollections(data.largestCollections);
          dataCtx.setNewItems(data.newestItems);
          dataCtx.setUsers(data.users);
          let arrayofptions = [];
          for (let element of data.uniqueTags) {
            arrayofptions.push({ value: element, label: element });
          }
          dataCtx.setTags(arrayofptions);
          dataCtx.setLoadingState(false);
        }
      })
      .catch((err) => console.log(err));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchValue]);

  return (
    <div id={theme}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={lighTheme}>
          <CssBaseline enableColorScheme />
          <Layout>
            <Routes>
              <Route path="/" element={<MainPage />} />
              {authCtx.isAdmin && (
                <Route path="/panel" element={<AdminPage />} />
              )}
              <Route path="/login" element={<AuthForm />} />
              {authCtx.isLoggedIn && (
                <Route path="/profile/:userId/*" element={<UserPage />} />
              )}
              <Route path="/collections" element={<CollectionsPage />} />
              <Route
                path="collection/:collectionId"
                element={<SingleCollection />}
              />
              <Route path="/items" element={<AllItems />} />
              <Route path="items/:itemId" element={<SingleItem />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
