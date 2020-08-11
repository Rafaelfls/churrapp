import React, { createContext, useState, useContext } from 'react';

const ChurrasCountContext = createContext();

export default function churrasCountProvider({ children }) {
    const [churrasCount, setChurrasCount] = useState(0);

  return (
      <ChurrasCountContext.Provider 
      value={{
          churrasCount, 
          setChurrasCount
          }}>
          {children}
      </ChurrasCountContext.Provider>
  );
}

export function useChurrasCount() {
    const context = useContext(ChurrasCountContext);
    const {churrasCount, setChurrasCount} = context;
    return {churrasCount, setChurrasCount};
}
