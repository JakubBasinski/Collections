import React, { useState } from 'react';

const CollectionContext = React.createContext({
  mode: '',
  setMode: (e) => {},
});

export const CollectionContextProvider = (props) => {
  const [edition, setEditionMode] = useState('new');

  const modeHandler = (e) => {
    setEditionMode(e);
  };

  const contextValue = {
    mode: edition,
    setMode: modeHandler,
  };

  return (
    <CollectionContext.Provider value={contextValue}>
      {props.children}
    </CollectionContext.Provider>
  );
};

export default CollectionContext;
