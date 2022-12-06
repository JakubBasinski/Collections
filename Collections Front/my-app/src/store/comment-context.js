import React, { useState } from 'react';

const CommentContext = React.createContext({
  count: '',
  setCount: (e) => {},
});

export const CommentContextProvider = (props) => {
  const [count, setCount] = useState(0);
  const contextValue = {
    count,
    setCount,
  };

  return (
    <CommentContext.Provider value={contextValue}>
      {props.children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
