import { Worker, isMainThread, parentPort } from "worker_threads";
import { genRawDeployment } from "@patronumlabs/nick-method";
import { ethers } from "ethers";
import { writeFileSync, appendFileSync } from "fs";

// Bytecode path
import { bytecode } from "../artifacts/contracts/ForceExample.sol/ForceExample.json"

// Constants
const GAS_LIMIT = 1000000; // Adjust this based on the gas limit you want to use
const GAS_PRICE = 1000000000; // Adjust this based on the gas price you want to use
const NATIVE_VALUE = 0; // Adjust this based on the amount of native currency you want to send
const ADDRESS_REGEX = /^0x*ca/i; // Adjust this based on the pattern of the address you want to find
const WORKER_COUNT = 16; // Adjust this based on your CPU core count for optimal performance
const ITERATIONS_PER_WORKER = 1_000_000; // Number of random r generated by each worker

// Generate a raw deployment transaction

if (isMainThread) {
    const startTime = new Date();
    console.log(`Started at: ${startTime}`);

    writeFileSync("r.txt", "");

    const startNextWorker = (workerIndex: number) => {
        const worker = new Worker(__filename);
        worker.postMessage({
            bytecode,
            ADDRESS_REGEX,
            iterations: ITERATIONS_PER_WORKER,
        });

        worker.on("message", (message) => {
            if (message.found) {
                appendFileSync("r.txt", `${message.r}: ${message.calculatedAddress}\n`);
                console.log(
                    `r found: ${message.r} with address: ${message.calculatedAddress}`
                );
            } else {
                console.log(
                    `Worker finished iterations for worker ${workerIndex}`
                );
                startNextWorker(workerIndex);
            }
        });
    };

    for (let i = 0; i < WORKER_COUNT; i++) {
        startNextWorker(i);
    }
} else {
    parentPort!.on("message", (message) => {
        const { bytecode, ADDRESS_REGEX, iterations } = message;

        let calculatedAddress: string;

        for (let i = 0; i < iterations; i++) {
            // Generate a random private key
            const privateKey = ethers.randomBytes(32);
            const keyPair = new ethers.SigningKey(privateKey);
            const r = keyPair.sign(ethers.hashMessage("Vanity")).r;

            const deploymentConfig = {
                gasLimit: GAS_LIMIT,
                gasPrice: GAS_PRICE,
                bytecode: bytecode,
                value: NATIVE_VALUE,
                r
            };
            const deploymentResult = genRawDeployment(deploymentConfig);
            calculatedAddress = ethers.getAddress(deploymentResult.contractAddress);

            if (ADDRESS_REGEX.test(calculatedAddress)) {
                parentPort!.postMessage({ found: true, r, calculatedAddress });
            }
        }

        parentPort!.postMessage({ found: false });
    });
}
