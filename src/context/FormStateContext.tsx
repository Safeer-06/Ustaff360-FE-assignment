import React, { createContext, useState } from "react";
import { FormData } from "../components/Products/FilterSidebarContainer";

const MyContext = createContext<{
  state: FormData;
  setStateFunc: (newState: FormData) => void;
}>({
  state: {
    category: "",
    maxPrice: "",
    minPrice: "",
  },
  setStateFunc: () => {},
});

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<FormData>({
    category: "",
    maxPrice: "",
    minPrice: "",
  });

  const setStateFunc = (newState: FormData) => {
    setState(newState);
  };

  return (
    <MyContext.Provider value={{ state, setStateFunc }}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, ContextProvider };
