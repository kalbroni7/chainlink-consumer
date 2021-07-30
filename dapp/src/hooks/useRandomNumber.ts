import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";

import getRandomNumberConsumer from "../lib/getRandomNumberConsumerContract";

const useRandomNumber = (address: string) => {
  const [randomResult, setRandomResult] = useState("");
  const [randomResultCallError, setRandomResultCallError] = useState("");

  const getRandomNumber = useCallback(() => {
    return getRandomNumberConsumer(address)
      .randomResult()
      .then((res: ethers.BigNumber) => res.toString())
      .then(setRandomResult)
      .catch((e: Error) => {
        console.error(e);
        setRandomResultCallError("Invalid random number contract address.");
      });
  }, [address]);

  useEffect(() => {
    if (!address) {
      return;
    }

    setRandomResult("");
    setRandomResultCallError("");

    getRandomNumber();
  }, [address, getRandomNumber]);

  return {
    randomResult,
    randomResultCallError,
    getRandomNumber,
  };
};

export default useRandomNumber;