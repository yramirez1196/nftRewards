import React from "react";
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
const example = () => {
  const { address, connector, isConnected } = useAccount();

  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      {isConnected ? (
        <div>
          <div>{ensName ? `${ensName} (${address})` : address}</div>
          <div>Connected to {connector?.name}</div>
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

                {isLoading &&
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
