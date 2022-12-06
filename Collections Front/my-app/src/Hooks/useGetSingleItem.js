import { useState } from 'react';
import axios from 'axios';

const useGetSingleItem = () => {
  const userId = localStorage.getItem('userId');
  const [state, setState] = useState({
    isLoading: 'false',
    error: '',
    fetchedItem: {},
    comments: [],
    likes: 0,
    isLiked: undefined,
  });

  const fn = async (itemId) => {
    let url = process.env.REACT_APP_URL;
    await axios
      .get(`${url}/items/${itemId}`)
      .then((res) => {
        if (res.data) {

          const item = res.data.item;
          const comments = res.data.comments;
          const likes = res.data.likes;
          const likesIds = item.likes;
          const isLiked = likesIds.includes(userId);

          setState({
            isLoading: 'false',
            error: '',
            fetchedItem: item,
            comments: comments,
            likes: likes,
            isLiked: isLiked,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return { mutate: fn, ...state };
};

export default useGetSingleItem;
