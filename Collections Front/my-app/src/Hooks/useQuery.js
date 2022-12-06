import axios from 'axios';
import { useEffect, useState } from 'react';

const useQuery = (url, refetch) => {
  const [state, setState] = useState({
    isLoading: 'true',
    error: '',
  });

  useEffect(() => {
    const fetch = async () => {
      axios
        .get(url)
        .then(({ data }) =>
          setState({ data, isLoading: false.valueOf, error: '' })
        )
        .catch((error) => {
          setState({ data: null, isLoading: false, error: error.message });
        });
    };
    fetch();
  }, [url, refetch]);
};

export default useQuery