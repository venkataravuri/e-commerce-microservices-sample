import { create } from "zustand";

type LoginStore = {
  accessToken: string | null;
  isLoggedIn: boolean;
  loggedInUserEmail: string | null;
  loggedInUserName: string | null;
  setLoginData: (
    accessToken: string,
    isLoggedIn: boolean,
    loggedInUserEmail: string,
    loggedInUserName: string
  ) => void;

  setLogoutData: () => void;
};

export const useBearStore = create<LoginStore>((set) => ({
  accessToken: null,
  isLoggedIn: false,
  loggedInUserEmail: null,
  loggedInUserName: null,

  setLoginData: (
    accessToken,
    isLoggedIn,
    loggedInUserEmail,
    loggedInUserName
  ) => set({ accessToken, isLoggedIn, loggedInUserEmail, loggedInUserName }),
  setLogoutData: () =>
    set({
      accessToken: null,
      isLoggedIn: false,
      loggedInUserEmail: null,
      loggedInUserName: null,
    }),
}));
