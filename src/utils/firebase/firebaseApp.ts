import { FirebaseApp, initializeApp } from "firebase/app";

import { Maybe } from "src/types/UtilityTypes";
import invariant from "invariant";

// This contains unique but non-secret info, see https://firebase.google.com/docs/web/setup?authuser=0#add-sdks-initialize
const firebaseConfig = {
  apiKey: "AIzaSyBLGRK1m3ZCv_cjYfP8Ij4J42ylF6UoDes",
  authDomain: "looking-glass-dea12.firebaseapp.com",
  projectId: "looking-glass-dea12",
  storageBucket: "looking-glass-dea12.appspot.com",
  messagingSenderId: "308861947929",
  appId: "1:308861947929:web:c404fc765a640e7bc11a88",
  measurementId: "G-D9HT0G95JH",
};

let firebaseAppVal: Maybe<FirebaseApp> = null;

// TODO: initialize analytics, perf
export default function firebaseApp(): FirebaseApp {
  invariant(
    typeof window !== "undefined",
    "This should only be called in the browser"
  );

  if (firebaseAppVal != null) {
    return firebaseAppVal;
  }

  firebaseAppVal = initializeApp(firebaseConfig);
  return firebaseAppVal;
}
