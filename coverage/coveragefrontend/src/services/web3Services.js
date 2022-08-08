import { ethers } from "ethers";
import toast from "../utilis/toastConfig";
import { createCoverageContract } from "../utilis/_Coverage";

export function hasEthereum() {
  return window.ethereum ? true : false;
}

