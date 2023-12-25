import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

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

export const useBearStore = create<LoginStore>()(
  devtools(
    persist(
      (set) => ({
        accessToken: null,
        isLoggedIn: false,
        loggedInUserEmail: null,
        loggedInUserName: null,

        setLoginData: (
          accessToken: string,
          isLoggedIn: boolean,
          loggedInUserEmail: string,
          loggedInUserName: string
        ) =>
          set((state) => ({
            accessToken: accessToken,
            isLoggedIn: isLoggedIn,
            loggedInUserEmail: loggedInUserEmail,
            loggedInUserName: loggedInUserName,
          })),

        setLogoutData: () =>
          set(() => ({
            accessToken: null,
            isLoggedIn: false,
            loggedInUserEmail: null,
            loggedInUserName: null,
          })),
      }),

      {
        name: "login-storage",
        storage: createJSONStorage(() => sessionStorage),
      } // unique name
    )
  )
);
