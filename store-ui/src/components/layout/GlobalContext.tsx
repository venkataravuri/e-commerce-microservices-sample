import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface GlobalContextInterface {
  data: any;
  setData: Dispatch<SetStateAction<any>>
}

export const globalContextDefaultValue: GlobalContextInterface = {
  data: {},
  setData: () => { }
}

const GlobalContext = createContext<GlobalContextInterface>(globalContextDefaultValue);

export default GlobalContext