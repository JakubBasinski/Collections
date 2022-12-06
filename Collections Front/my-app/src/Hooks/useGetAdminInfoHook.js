import { useState } from 'react';
import axios from 'axios';

const useGetAdminInfoHook = () => {
  const [state, setState] = useState({
    isLoading: 'false',
    error: '',
    users: [],
  });



  const fn = async (itemId) => {
    let url = process.env.REACT_APP_URL;
    await axios
      .get(`${url}/panel`)
      .then((res) => {
        if (res.data) {
          setState({
            isLoading: 'false',
            error: '',
            users: res.data.users,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return { mutate: fn, ...state };
};

export default useGetAdminInfoHook;
