import { getAuth, onAuthStateChanged } from "firebase/auth";

import { AppProps } from "next/app";
import { RelayEnvironmentProvider } from "react-relay";
import { UserContextProvider } from "src/context/UserContext";
import browserOnly from "src/utils/browserOnly";
import firebaseApp from "src/utils/firebase/firebaseApp";
import { useEffect } from "react";
import useRelayEnvironment from "src/hooks/useRelayEnvironment";
import useUserContext from "src/hooks/useUserContext";

const app = browserOnly(firebaseApp);
const auth = browserOnly(getAuth, app!);

function AppInner({ Component, pageProps }: AppProps): JSX.Element {
  const { authState, isValid, setUser } = useUserContext();
  useEffect(() => {
    // Listen for authentication state to change.
    const unsubscribe = onAuthStateChanged(auth!, async (user) => {
      console.log("onAuthStateChanged, isLoggedIn = ", user != null);
      setUser(user);
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headers: { [key: string]: string } =
    authState.token != null
      ? {
          Authorization: `Bearer ${authState.token}`,
        }
      : {};
  const relayEnvironment = useRelayEnvironment(headers);

  if (!isValid) {
    return null;
  }

  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <Component {...pageProps} />
    </RelayEnvironmentProvider>
  );
}

function App(props: AppProps): JSX.Element {
  return (
    <UserContextProvider>
      <AppInner {...props} />
    </UserContextProvider>
  );
}

export default App;
