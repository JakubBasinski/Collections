import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthorizationContext = React.createContext({
  token: '',
  isLoggedIn: true,
  login: (token, user) => {},
  logout: () => {},
  userId: '',
  isAdmin: false,
});

const caclucateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const retriveStored = () => {
  const storedToken = localStorage.getItem('token');
  const storedId = localStorage.getItem('userId');
  const isAdmin = localStorage.getItem('isAdmin');
  const storedExpirationDate = localStorage.getItem('expirationTime');
  const remainingTime = caclucateRemainingTime(storedExpirationDate);
  if (remainingTime <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return null;
  }
  return {
    token: storedToken,
    userId: storedId,
    duration: remainingTime,
    isAdmin: isAdmin,
  };
};

export const AuthorizationContextProvider = (props) => {
  const storagedData = retriveStored();
  let tokenData;
  if (storagedData) {
    tokenData = storagedData.token;
  }
  let initialToken;
  let initialUserId;
  let initialIsAdmin;

  if (tokenData) {
    initialToken = tokenData;
    initialUserId = storagedData.userId;
    initialIsAdmin = storagedData.isAdmin;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialUserId);
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('isAdmin');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, userId, expirationTime, isAdmin) => {
    setToken(token);
    setUserId(userId);
    setIsAdmin(isAdmin);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expirationTime', expirationTime);
    localStorage.setItem('isAdmin', isAdmin);
    const remainingTime = caclucateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (storagedData) {
      logoutTimer = setTimeout(logoutHandler, storagedData.duration);
    }
  }, [storagedData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    isAdmin: isAdmin,
    login: loginHandler,
    logout: logoutHandler,
    userId: userId,
  };

  return (
    <AuthorizationContext.Provider value={contextValue}>
      {props.children}
    </AuthorizationContext.Provider>
  );
};

export default AuthorizationContext;
