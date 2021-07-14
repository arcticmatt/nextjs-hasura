import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

export default function GoogleLoginButton() {
  return (
    <button
      onClick={() => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider).catch(() => {
          // eslint-disable-next-line no-alert
          alert("Error logging in");
        });
      }}
      type="button"
    >
      Login with Google
    </button>
  );
}
