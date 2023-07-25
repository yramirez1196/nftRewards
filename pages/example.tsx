import React from "react";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useFeeData,
} from "wagmi";
const example = () => {
  const { address, connector, isConnected } = useAccount();

  const { data: ensName } = useEnsName({ address });
  const {
    connect,
    connectors,
    error,
    isLoading: isLoadingAddress,
    pendingConnector,
  } = useConnect();
  const { disconnect } = useDisconnect();
  const { data /*  isError, isLoading */ } = useFeeData();

  /* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJub25jZSI6IjE1MzJhYWU5LTk3ODEtNDYzOC1iZDkyLTBlMGNjMTBmMGI4OSIsIm9yZ0lkIjoiMTU0NTkxIiwidXNlcklkIjoiMTU0MjM1IiwidHlwZUlkIjoiZGY2NTBmOGQtZTVkZS00YjZhLWEzNTMtZDY1MDg5MmY0ZTRjIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTAzMDA3MTIsImV4cCI6NDg0NjA2MDcxMn0
    .fDn5x2anKsuKxYUk4Xs7nv - RDCORd067nQyR1TrduuE; */
  

  return (
    <div>
      {isConnected ? (
        <div>
          <div>{ensName ? `${ensName} (${address})` : address}</div>
          <div>Connected to {connector?.name}</div>
          <div>Fee data: {JSON.stringify(data?.formatted)}</div>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-[300px]">
          {connectors?.map((connector) => {
            console.log(connector.ready);
            return (
              <button
                /* disabled={!connector.ready} */
                key={connector.id}
                onClick={() => {
                  if (connector.ready) {
                    connect({ connector });
                  }
                }}
              >
                {connector.name}
                {/* {!connector?.ready && <span>(unsupported)</span>} */}

                {isLoadingAddress &&
                  connector.id === pendingConnector?.id &&
                  " (connecting)"}
              </button>
            );
          })}

          {error && <div>{error.message}</div>}
        </div>
      )}
    </div>
  );
};

export default example;
