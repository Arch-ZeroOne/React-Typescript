import React, { useContext, useState } from "react";

const LoaderContext = React.createContext({});

function useLoader() {
  return useContext(LoaderContext);
}

function LoadingContext({ children }: any) {
  const [loading, setLoading] = useState<Boolean>(false);

  return (
    <div>
      <LoaderContext.Provider value={{ loading, setLoading }}>
        {children}
      </LoaderContext.Provider>
    </div>
  );
}

export default LoadingContext;
