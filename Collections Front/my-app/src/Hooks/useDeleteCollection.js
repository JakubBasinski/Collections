import { useState } from 'react';
import axios from 'axios';

const useDeleteCollection = () => {
  const [state, setState] = useState({
    isLoading: 'false',
    error: '',
  });

  const fn = async (id) => {
    let url = process.env.REACT_APP_URL;
    const token = localStorage.getItem('token');
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    axios
      .post(
        `${url}/collection/delete/${id}`,
        {},
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        if (res) {
          console.log(res);
        }
        setState({
          isLoading: false,
          error: '',
        });
      })
      .catch((error) => setState({ isLoading: false, error }));
  };

  return { mutate: fn, ...state };
};

export default useDeleteCollection;
