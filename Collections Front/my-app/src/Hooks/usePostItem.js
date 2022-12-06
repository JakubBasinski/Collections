import { useState, useEffect } from 'react';
import axios from 'axios';

const usePostItem = () => {
  const [state, setState] = useState({
    isLoading: 'false',
    error: '',
    message: '',
  });
  let url = process.env.REACT_APP_URL;


  const fn = async (data, token) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    axios
      .post(`${url}/createItem`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setState({ isLoading: false, error: '' });
      })
      .catch((error) => setState({ isLoading: false, error }));
  };

  return { mutate: fn, ...state };
};

export default usePostItem;
