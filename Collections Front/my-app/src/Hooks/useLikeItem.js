import { useState } from 'react';
import axios from 'axios';

const useLikeItem = () => {
  const [state, setState] = useState({
    isLoading: 'false',
    error: '',
    updatedLikes: '',
  });

  let url = process.env.REACT_APP_URL;

  const fn = async (itemId, token) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    const fd = new FormData();
    fd.append('itemId', itemId);
    axios
      .post(`${url}/likeItem/`, fd, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const item = res.data.item;
        const updatedLikes = item.likes.length;
        if (res) {
          setState({ isLoading: false, error: '', updatedLikes });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { mutate: fn, ...state };
};

export default useLikeItem;
