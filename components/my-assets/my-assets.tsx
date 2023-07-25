import React from "react";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";
export const MyAssetsComponent = () => {
  const [Assets, setAssets] = React.useState<any>();
  const RunApp = async () => {
		if (!Moralis.Core.isStarted)
      await Moralis.start({
        apiKey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjE1MzJhYWU5LTk3ODEtNDYzOC1iZDkyLTBlMGNjMTBmMGI4OSIsIm9yZ0lkIjoiMTU0NTkxIiwidXNlcklkIjoiMTU0MjM1IiwidHlwZUlkIjoiZGY2NTBmOGQtZTVkZS00YjZhLWEzNTMtZDY1MDg5MmY0ZTRjIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTAzMDA3MTIsImV4cCI6NDg0NjA2MDcxMn0.fDn5x2anKsuKxYUk4Xs7nv-RDCORd067nQyR1TrduuE",
        // ...and any other configuration
      });
   const address = "0xD661C81a0E1109e977946B0515Cf494d27fBfcCa";
    const chain = EvmChain.GOERLI;
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      address,
      chain,
    });
    const results = await response.result;
    setAssets(results);
    console.log(results); 
  };

  React.useEffect(() => {
		if (!Assets) {
			RunApp();
    }
    
  }, []);
  return (
    <div className="relative">
			<div>
				<h5 className="text-2xl font-bold text-white">My Assets</h5>
			</div>
      <div className="grid grid-cols-4  gap-x-4 gap-y-4 mt-6">
        {Assets?.map((asset: any, index: number) => {
          console.log(asset._data?.metadata);
          return (
            <div key={index} className="px-4 py-3 bg-white rounded-lg">
							<div>
								<img src={asset._data?.metadata?.image || ""} alt="" />
							</div>
              <div className="pt-2">
								<p className="text-base font-semibold">{asset._data?.metadata?.name} </p>
							</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
