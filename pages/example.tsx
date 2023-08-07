import React from "react";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useFeeData,
  useWalletClient,
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

  if (typeof window !== "undefined") {
    (window as any).web3?.eth?.getBalance(
      "0xD661C81a0E1109e977946B0515Cf494d27fBfcCa",
      (err: any, b: any) => {
        if (err) console.log(err);
        const balance = {} as any;
				console.log((window as any).web3.utils);
        balance.ether = (window as any).web3.utils.fromWei(b, "ether");
      }
    );
  }

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
