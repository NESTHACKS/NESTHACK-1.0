
import axios from "axios";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js"; 

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGRmZjVkQzgxQTc2RTU3MjU4RTJkYjRiOUI3M0UyQjcwNGY1OEUyOTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTgzMTAyNTY1MjMsIm5hbWUiOiJ0b3dvYm8ifQ.M89QTGh_BlkOjl-bJTD3_LpZIMO7SSd4FmVgNZG3H5o';
if (!API_KEY) {
  alert('REACT_APP_STORAGE_KEY environment variable is required')
}

function getAccessToken() {
  return API_KEY;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

export const ipfsUrl = (cid, fileName) => {
    let url = `https://ipfs.io/ipfs/${cid}`;
    if (fileName) {
      return `${url}/${fileName}`;
    }
    return url;
  };


export async function storeFiles(files) {
  console.log('store', files)
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log("stored files with cid:", cid);
  return cid;
}

export function fetchMetadata(cid) {
  const url = `${ipfsUrl(cid)}/metadata.json`
  return axios.get(url)
}

export async function retrieveFiles(cid) {
  const client = makeStorageClient();
  const res = await client.get(cid);
  console.log(`Got a response! [${res.status}] ${res.statusText}`);
  if (!res.ok) {
    throw new Error(`failed to get ${cid}`);
  }

  // request succeeded! do something with the response object here...

  return res;
}
