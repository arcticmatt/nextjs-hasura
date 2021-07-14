import { UserContext, UserContextData } from "src/context/UserContext";

import { useContext } from "react";

export default function useUserContext(): UserContextData {
  return useContext(UserContext);
}
