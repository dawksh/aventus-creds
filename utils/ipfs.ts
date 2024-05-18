import { create } from 'kubo-rpc-client'

const projectId = "2E9f5iaHCwLIuhFcAwvpuk7KMZM";
const projectSecret = "bd25dc2300a081d17e67731b4b3b574f";
const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: auth,
    },
});

export { client as ipfsClient }