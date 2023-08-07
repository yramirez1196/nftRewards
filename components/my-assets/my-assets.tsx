import React from "react";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";

import clsx from "clsx";
import { useAccount } from "wagmi";
/* import { ethers } from "ethers"; */

export const MyAssetsComponent = () => {
  const { address: addressWallet } = useAccount();
  const [AssetsNfts, setAssetsNfts] = React.useState<any>();
  const [AssetsTokens, setAssetsTokens] = React.useState<any>();
  const [Option, setOption] = React.useState("NFTS");

  const RunApp = async () => {
    if (!Moralis.Core.isStarted)
      await Moralis.start({
        apiKey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjE1MzJhYWU5LTk3ODEtNDYzOC1iZDkyLTBlMGNjMTBmMGI4OSIsIm9yZ0lkIjoiMTU0NTkxIiwidXNlcklkIjoiMTU0MjM1IiwidHlwZUlkIjoiZGY2NTBmOGQtZTVkZS00YjZhLWEzNTMtZDY1MDg5MmY0ZTRjIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTAzMDA3MTIsImV4cCI6NDg0NjA2MDcxMn0.fDn5x2anKsuKxYUk4Xs7nv-RDCORd067nQyR1TrduuE",
        // ...and any other configuration
      });
    const address = addressWallet || "";
    const chain = EvmChain.GOERLI;
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
    });

    const results = await response.result;
    setAssetsNfts(results);

    const resultsTokens = await Moralis.EvmApi.token.getWalletTokenBalances({
      chain: chain,
      address: address,
    });

    /* console.log(resultsTokens.raw); */
    setAssetsTokens(resultsTokens.raw);
  };

  React.useEffect(() => {
    if (!AssetsNfts && !AssetsTokens) {
      RunApp();
    }
  }, []);
  const tabs = [
    { name: "Nfts", href: "NFTS" },
    { name: "Tokens", href: "TOKENS" },
  ];

  const getBalanceTokens = (balance: string, decimals?: string) => {
    const result = Number(balance) / 10 ** (Number(decimals) - 1 || 1);

    return result.toFixed(2);
    /* const WeiToEther = ethers.formatEther(balance);
		return WeiToEther; */
  };
  return (
    <div className="relative">
      <div>
        <h5 className="text-2xl font-bold text-white">My Assets</h5>
      </div>
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          {/* <select
            id="tabs"
            name="tabs"
            className="block w-full  py-2 pl-3 pr-10 text-base "
            defaultValue={tabs.find((tab) => tab.href === Option)?.name || ""}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select> */}
        </div>
        <div className="block">
          <div className="">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => {
                    setOption(tab.href);
                  }}
                  className={clsx(
										'focus:outline-none',
                    tab.href === Option
                      ? "border-lightBlue-600 text-lightBlue-600"
                      : "border-transparent text-gray-500 hover:border-gray-400 hover:text-gray-400",
                    "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                  )}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4  gap-x-4 gap-y-4 mt-6">
        {Option === "NFTS" &&
          AssetsNfts?.map((asset: any, index: number) => {
            return (
              <div key={index} className="px-4 py-3 bg-white rounded-lg">
                <div>
                  <img src={asset._data?.metadata?.image || ""} alt="" />
                </div>
                <div className="pt-2">
                  <p className="text-base font-semibold">
                    {asset._data?.metadata?.name}{" "}
                  </p>
                </div>
              </div>
            );
          })}

        {Option === "TOKENS" &&
          AssetsTokens?.map((asset: any, index: number) => {
            console.log(asset);
            return (
              <div
                key={index}
                className="px-4 py-3 bg-white rounded-lg flex flex-col gap-y-2"
              >
                <div>
                  <p className="break-words font-bold text-xl">
                    {" "}
                    {asset?.symbol}{" "}
                  </p>
                </div>
                <div>
                  <p className="break-words font-medium text-lg">
                    {asset?.name}
                  </p>
                </div>
                <div>
                  <p className="font-normal text-slate-500">
                    ${getBalanceTokens(asset?.balance, asset?.decimals)}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
