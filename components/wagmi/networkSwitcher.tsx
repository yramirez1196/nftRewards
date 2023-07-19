import React from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";
export const NetworkSwitcher = () => {
  const { chain } = useNetwork();
  const { chains, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  return (
    <div>
      Connected to {chain?.name ?? chain?.id}
      {chain?.unsupported && " (unsupported)"}
      {switchNetwork && (
        <div className="">
          {chains.map((x) => {
            return x.id === chain?.id ? null : (
              <button
                className="px-4 py-2"
                key={x.id}
                onClick={() => switchNetwork(x.id)}
              >
                Change to {x.name}
                {isLoading && x.id === pendingChainId && " (switching)"}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
