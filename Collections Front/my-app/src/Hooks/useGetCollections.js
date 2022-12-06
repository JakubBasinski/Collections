import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const useGetCollections = () => {
  const { userId } = useParams();
  const [state, setState] = useState({
    fetchedCollectionsState: [],
    isLoading: 'false',
    error: '',
  });

  const fn = async () => {
    let url = process.env.REACT_APP_URL;
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    axios
      .get(`${url}/profile/${userId}`)
      .then((res) => {
        let collectionsArray;
        if (res.data) {
          const fetchedCollections = res.data.updatedCollection;
          collectionsArray = Object.values(fetchedCollections);
        }
        setState({
          isLoading: false,
          error: '',
          fetchedCollectionsState: collectionsArray,
        });
      })
      .catch((error) => setState({ isLoading: false, error }));
  };

  return { mutate: fn, ...state };
};

export default useGetCollections;
