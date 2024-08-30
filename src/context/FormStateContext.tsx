import React, { createContext, useState } from "react";

const MyContext = createContext<{
  count: number;
  increment: () => void;
}>({
  count: 0,
  increment: () => {},
});

function MyProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <MyContext.Provider value={{ count, increment }}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, MyProvider };
