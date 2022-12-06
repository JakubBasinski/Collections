import { formLabelClasses } from '@mui/material';
import React, { useState } from 'react';

const DataContext = React.createContext({
  collections: [],
  setCollections: () => {},
  largestCollections: [],
  setLargestCollections: () => {},
  items: [],
  setItems: () => {},
  newItems: [],
  setNewItems: () => {},
  tags: [],
  setTags: () => {},
  refetchValue: 0,
  setRefetch: () => {},
  users: [],
  setUsers: () => {},
  theme: '',
  setTheme: () => {},
});

export const DataContextProvider = (props) => {
  const [fetchedCollections, setCollectionState] = useState([]);
  const [fetchedItems, setItemsState] = useState([]);
  const [refetchValueState, setRefetchValue] = useState(0);
  const [biggestCollections, setBiggestCollections] = useState([]);
  const [newestItems, setNewestItems] = useState([]);
  const [fetchedTags, setFetchedTags] = useState([]);
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(formLabelClasses);
  const [theme, setTheme] = useState('light');

  const collectionHandler = (e) => {
    setCollectionState(e);
  };

  const setIsLoadingHangler = (e) => {
    setIsLoading(e);
  };

  const biggestCollectionHandler = (e) => {
    setBiggestCollections(e);
  };

  const newestItemsHandler = (e) => {
    setNewestItems(e);
  };

  const itemHandler = (e) => {
    setItemsState(e);
  };

  const refetchHandler = (e) => {
    setRefetchValue((p) => p + 1);
  };

  const tagsHandler = (e) => {
    setFetchedTags(e);
  };

  const userHandler = (e) => {
    setFetchedUsers(e);
  };

  const setThemeController = (e) => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };

  const contextValue = {
    collections: fetchedCollections,
    setCollections: collectionHandler,
    largestCollections: biggestCollections,
    setLargestCollections: biggestCollectionHandler,
    items: fetchedItems,
    setItems: itemHandler,
    newItems: newestItems,
    setNewItems: newestItemsHandler,
    tags: fetchedTags,
    setTags: tagsHandler,
    refetchValue: refetchValueState,
    setRefetch: refetchHandler,
    users: fetchedUsers,
    setUsers: userHandler,
    isLoading: isLoading,
    setLoadingState: setIsLoadingHangler,
    theme: theme,
    setThemeController: setThemeController,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
