import GoogleLoginButton from "src/components/GoogleLoginButton";
import RelayTest from "src/components/RelayTest";
import useUserContext from "src/hooks/useUserContext";

export default function Home() {
  const { isLoggedIn } = useUserContext();

  if (!isLoggedIn) {
    return (
      <>
        <div>Not logged in</div>
        <GoogleLoginButton />
      </>
    );
  }

  return (
    <>
      <div>Logged in!</div>
      <RelayTest />
    </>
  );
}
