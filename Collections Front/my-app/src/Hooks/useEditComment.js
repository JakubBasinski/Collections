import { useState } from 'react';
import axios from 'axios';

const useEditComment = () => {
  const [state, setState] = useState({
    isLoading: 'false',
    error: '',
    serverMsg: '',
  });

  let url = process.env.REACT_APP_URL;
  const fn = async (data, token) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    axios
      .post(`${url}/editComment/`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { mutate: fn, ...state };
};

export default useEditComment;
