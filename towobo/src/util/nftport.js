import axios from "axios";

import { NFT_PORT_KEY } from "./constants";

export const createSignatureNFT = async (
  name,
  description,
  ownerAddress,
  signatureData
) => {
  const params = {
    chain: "polygon",
    mint_to_address: ownerAddress,
    description,
    name,
  };

  const formData = new FormData();
  
  const blob = await (await fetch(signatureData)).blob();
  const file = new File([blob], "signature.jpg", {
    type: "image/jpeg",
    lastModified: new Date(),
  });

  formData.append("file", file, file.name);

  var options = {
    method: "POST",
    url: 'https://api.nftport.xyz/v0/files',
    params,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: NFT_PORT_KEY,
      "content-type":
        "multipart/form-data; boundary=---011000010111000001101001",
    },
    data: formData,
  };

  return axios.request(options);
};

export const getMintedNFT = (txHash) => {
  var options = {
    method: "GET",
    url: "https://api.nftport.xyz/v0/mints/" + txHash,
    params: { chain: "polygon" },
    headers: {
      "Content-Type": "application/json",
      Authorization: NFT_PORT_KEY,
    },
  };

  return axios.request(options);
};
