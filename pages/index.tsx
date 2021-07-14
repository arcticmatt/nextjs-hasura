import RelayEnvironment from "src/utils/relay/RelayEnvironment";
import { RelayEnvironmentProvider } from "react-relay";
import RelayTest from "src/components/RelayTest";

export default function Home() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <RelayTest />
    </RelayEnvironmentProvider>
  );
}
