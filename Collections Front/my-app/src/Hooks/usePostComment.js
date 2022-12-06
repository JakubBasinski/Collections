import { useState } from 'react';
import axios from 'axios';

const usePostComment = () => {
  const [state, setState] = useState({
    isLoading: 'false',
    error: '',
    comment: {},
    serverMsg: '',
  });

  let url = process.env.REACT_APP_URL;
  const fn = async (data, token) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    axios
      .post(`${url}/createComment/`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (res.data) {
          setState({ isLoading: false, error: '', comment: res.data.comment });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { mutate: fn, ...state };
};

export default usePostComment;
