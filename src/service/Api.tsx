import { MockData } from "./MockData";

export const getProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return MockData;
};
