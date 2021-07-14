/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type RelayTestQueryVariables = {};
export type RelayTestQueryResponse = {
    readonly users: ReadonlyArray<{
        readonly id: string;
    }>;
};
export type RelayTestQuery = {
    readonly response: RelayTestQueryResponse;
    readonly variables: RelayTestQueryVariables;
};



/*
query RelayTestQuery {
  users {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "users",
    "kind": "LinkedField",
    "name": "users",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RelayTestQuery",
    "selections": (v0/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RelayTestQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "fd4493bcff19f817429ca4149a761cc9",
    "id": null,
    "metadata": {},
    "name": "RelayTestQuery",
    "operationKind": "query",
    "text": "query RelayTestQuery {\n  users {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '2a758a33d1e0952f4f0c92dc4f3959ab';
export default node;
