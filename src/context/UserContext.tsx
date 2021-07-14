import { Context, createContext, useState } from "react";
import { Maybe, MaybeUndef } from "src/types/UtilityTypes";

import { User } from "firebase/auth";
import emptyFunction from "src/utils/emptyFunction";

type AuthState = {
  status: "loading" | "in" | "out";
  token?: string;
};

export type UserContextData = {
  authState: AuthState;
  isLoggedIn: boolean;
  // If onAuthStateChanged has not run yet, this is false.
  isValid: boolean;
  setUser: (user: Maybe<User>) => void;
  user: MaybeUndef<User>;
  userId: Maybe<string>;
};

export const UserContext: Context<UserContextData> =
  createContext<UserContextData>({
    authState: { status: "loading" },
    isLoggedIn: false,
    isValid: false,
    setUser: emptyFunction,
    user: null,
    userId: null,
  });

type ProviderProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  user?: MaybeUndef<User>;
};

export function UserContextProvider(props: ProviderProps): JSX.Element {
  const [authState, setAuthState] = useState<AuthState>({ status: "loading" });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [user, setUser] = useState<MaybeUndef<User>>(props.user);
  const [userId, setUserId] = useState<Maybe<string>>(props.user?.uid ?? null);

  return (
    <UserContext.Provider
      value={{
        authState,
        isLoggedIn,
        isValid,
        setUser: async (userInner) => {
          if (userInner != null) {
            setUser(userInner);
            // Must be after setUser, otherwise could have intermediate state where
            // user is null and isLoggedIn is true.
            setIsLoggedIn(true);

            const token = await userInner.getIdToken();
            const idTokenResult = await userInner.getIdTokenResult();
            const hasuraClaim =
              idTokenResult.claims["https://hasura.io/jwt/claims"];

            if (hasuraClaim) {
              setAuthState({ status: "in", token });
            } else {
              // Force refresh to pick up the latest custom claims changes.
              const tokenInner = await userInner.getIdToken(true);
              setAuthState({ status: "in", token: tokenInner });
            }
          } else {
            // Must be before setUser, otherwise could have intermediate state where
            // user is null and isLoggedIn is true.
            setIsLoggedIn(false);
            setUser(userInner);
          }

          setUserId(userInner?.uid ?? null);
          // Must be last.
          setIsValid(true);
        },
        user,
        userId,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
