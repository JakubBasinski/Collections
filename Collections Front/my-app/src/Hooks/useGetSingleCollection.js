import { useState } from 'react';
import axios from 'axios';

const useGetSingleCollection = () => {
  const [state, setState] = useState({
    isLoading: 'false',
    error: '',
    fetchedCollection: {},
    fetchedUrl: '',
    fetchedItems: [],
  });

  const fn = async (collectionId) => {
    let url = process.env.REACT_APP_URL;
    await axios
      .get(`${url}/collection/${collectionId}`)
      .then((res) => {
        let collection;
        let url;
        let items;
        if (res.data) {
          collection = res.data.collection;
          url = res.data.singleImageUrl;
          items = res.data.items;
          
          setState({
            isLoading: 'false',
            error: '',
            fetchedCollection: collection,
            fetchedUrl: url,
            fetchedItems: items,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return { mutate: fn, ...state };
};

export default useGetSingleCollection;
