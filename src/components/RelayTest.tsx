import { RelayTestQuery } from "src/__generated__/RelayTestQuery.graphql";
import { Suspense } from "react";
import { graphql } from "relay-runtime";
import { useLazyLoadQuery } from "react-relay";

const query = graphql`
  query RelayTestQuery {
    users {
      id
    }
  }
`;

function Inner(): JSX.Element {
  const data = useLazyLoadQuery<RelayTestQuery>(query, {
    variables: {},
  });

  console.log("data", data);

  return <div>hi</div>;
}

export default function RelayTest(): JSX.Element {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Inner />
    </Suspense>
  );
}
