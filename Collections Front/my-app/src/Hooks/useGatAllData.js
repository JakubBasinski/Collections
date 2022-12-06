import { useState } from 'react';
import axios from 'axios';

const useGatAllData = () => {
  const [state, setState] = useState({
    isLoading: 'false',
    error: '',
  });
  
  const fn = async () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    
   
  };

  return { mutate: fn, ...state };
};

export default useGatAllData;
