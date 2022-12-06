import { useState } from 'react';
import axios from 'axios';

const useDeleteComment = () => {
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
      .post(`${url}/deleteComment/`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log('res after delete');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { mutate: fn, ...state };
};

export default useDeleteComment;
