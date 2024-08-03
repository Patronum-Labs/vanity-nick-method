# @patronumlabs/vanity-nick-method

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/license/mit)

This repository provides a simple Hardhat TypeScript script that reads the bytecode of compiled contracts and generates vanity addresses based on nick-method and a random `r` generated value matched with regex provided by the developer.

## Rationale

While there are more efficient and faster examples with Rust, this script is practical for simple use cases. It can still generate very unique addresses in a short amount of time, depending on the machine's worker count.

## Benchmark

The performance of this `r` generation tool heavily depends on the complexity of the regex pattern used for matching addresses. Here are some approximate benchmarks:

- **Simple regex (e.g., matching 2 characters):**
  - Approximately 10 `r` found in 1 second.

- **More complex regex (e.g., matching 4 characters):**
  - Approximately 1 `r` found every ~9 seconds.

Please note that these benchmarks are approximations and may vary based on the specific regex pattern, hardware specifications, and other factors.

## Usage

1- Clone the repository:

```bash
git clone https://github.com/Patronum-Labs/vanity-nick-method.git
cd vanity-nick-method
```

2- Install the dependencies:

```bash
npm install
```

3- Compile the contracts:

```bash
npm run build
```

4- Update the script:

* Bytecode of the contract to deploy
* [Regex Tester](https://regexr.com/)
* [Find how many CPU cores do you have - Windows](https://www.pcworld.com/article/395047/how-many-cpu-cores-do-you-have.html)
* [Find how many CPU cores do you have - Mac](https://support.macincloud.com/support/solutions/articles/8000087401-how-can-i-check-the-number-of-cpu-cores-on-a-mac#:~:text=Navigate%20towards%20the%20top%20left,of%20%22Total%20number%20of%20Cores%22)

```typescript
// Constants
import { bytecode } from "../artifacts/contracts/ForceExample.sol/ForceExample.json" // Either import or set it as a predefined const
const GAS_LIMIT = 1000000; // Adjust this based on the gas limit you want to use
const GAS_PRICE = 1000000000; // Adjust this based on the gas price you want to use
const NATIVE_VALUE = 0; // Adjust this based on the amount of native currency you want to send
const ADDRESS_REGEX = /^0x*ca/i; // Adjust this based on the pattern of the address you want to find
const WORKER_COUNT = 16; // Adjust this based on your CPU core count for optimal performance
const ITERATIONS_PER_WORKER = 1_000_000; // Number of random r generated by each worker
```

5- Run the script:

```typescript
npm run vanity
```

## Output

`r`(s) will be written to the root in `r.txt`.

> On each new run, **r.txt** will be reset with new values.

```txt
r found: 0x3d642f3294d9f9f6b93a4cd7aa2a196863a93b591b5b3bc412d93c397c179fce with address: 0xCa7b2cAe63Bf7A6Ac62516064B85e85f456EB977
r found: 0xa12c400fb39d2ecb9912fce38cf1db1ece60cf56f12b9183eeff53b0e37ffd2b with address: 0xca1f12ecb9ba33a3F64df277D4B7e26FF0f28A46
r found: 0x0492954e0e3f8c8932897a2f4c2c81c32f8f9b9c24f99ad6017f988e3abe6f36 with address: 0xcac66Df16420065Dc43cff88b2578E9A7CAAD05e
r found: 0x3b416589d8797dd913f70a4bb92ebb7ea1301ec4af985ecab0eb4328ffca9d98 with address: 0xCA6cBE4baAD9325804aF18361E0ABfB5B3aE0d9b
r found: 0xd2749f3201dd065a54f4cd0d65ab21ba77cc22ab5a7a884439e3f8fcab2864bc with address: 0xCac5cC67472Dd3CbdcD3A594003B82fAdfE458eF
r found: 0xa4c597ddc08dbd1e9cc40a18dc25f5c0163ed7ae4aae901647122d7a51f68a53 with address: 0xcA5CAE439D312e08D5b7ec8e5b9d983dFC32B237
r found: 0xe04140a32f2d06247e9fa841f0d430f8f995f7b8aa4ee8186e5261a96826762b with address: 0xca8A91c79673F402237Fba3E0CaF3126957b1Cc6
r found: 0x37802bd744b2e3b68b4082d6b65010217906ae8aeafa47dd648bf8361d5e019e with address: 0xCA943F45e822b74F696054e84212bf433147eD2B
r found: 0x33ce7cf257b1eadd2195b4aa1e28686f2c82abea2645cd1f6166ff5da5549324 with address: 0xCa77eDF60C8BeCBa334f1C0E09e3a5cb09040d42
r found: 0x44ed88c86217afc4e759b72dac445d1ed84cc84fced2c1a16504e4b656a71f8d with address: 0xCaD0dEbE5a58B6f538f9b4009fEb5aFDE52Bb43c
r found: 0x98affe9d365139fae6239d0ffaabdc8d87f714ab69730519579773320a4a8c56 with address: 0xCa5B81D70e050231Fb03437117891AAA1DB453Ba
r found: 0x2e016699921a77dc3a94f93750d4fed87e0b468e535c9d48026a0b01cc6dcecc with address: 0xcA7C22a71341087A1378aa59D68Dd1f2388A44a2
...
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)