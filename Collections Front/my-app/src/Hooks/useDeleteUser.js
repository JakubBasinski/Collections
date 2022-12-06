import { useState } from 'react';
import axios from 'axios';

const useDeleteUser = () => {
  const token = localStorage.getItem('token');
  const [state, setState] = useState({
    isLoading: 'false',
    error: '',
    serverMsg: '',
  });

  let url = process.env.REACT_APP_URL;
  const fn = async (data) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    const fd = new FormData();
    fd.append('userId', data);
    axios
      .post(`${url}/deleteUser/`, fd, {
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

export default useDeleteUser;
