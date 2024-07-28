
# BlockEdu
<h3 align="center">BlockEdu dApp</h3>

<p align="center">
  The BlockEdu (Blockchain Education) decentralized application documentation.
</p>

## About

<p>
  BlockEdu is a decentralized application (dApp) powered by <a href="https://docs.cartesi.io/cartesi-rollups/1.3/">Cartesi</a> rollups technology.
</p>
<p> 
  It is a platform for handling and managing courses or learning materials, leveraging blockchain benefits such as ownership assurance, secure and reliable rewards, and a decentralized network.
</p>

## Getting Started

Below you'll find instructions on how to set up this dApp locally.

### Prerequisites

Ensure you have the following packages installed on your PC:

- [nodejs](https://nodejs.org/en)
- [npm](https://docs.npmjs.com/cli/v10/configuring-npm/install)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
- [docker](https://docs.docker.com/get-docker/)
- [cartesi-cli](https://docs.cartesi.io/cartesi-rollups/1.3/development/migration/#install-cartesi-cli)

  ```sh
  npm install -g @cartesi/cli
  ```

### Installation

1. Clone this repository

   ```sh
   git clone https://github.com/ikemHood/BlockEdu.git
   ```

2. Install NPM packages

   ```sh
   yarn install
   ```

3. Build and run the dApp via `cartesi-cli`

   ```sh
   cartesi build 
   ```

   ```sh
   cartesi run 
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

This section contains examples of how to interact with the dApp and consume its resources.

### Advanced Handlers

* #### create_course

  ```js
  description — create a new course.
  param data — {name: string, owner: address ("0x..."), img_url: string, description: string}
  ```

  data sample

  ```json
  {
    "method": "create_course", 
    "data": {
      "name": "Blockchain Basics",
      "owner": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "img_url": "https://example.com/course.png",
      "description": "An introductory course on blockchain technology."
    }
  }
  ```

  hex sample

  ``` 
  0x7b226d6574686f64223a226372656174655f636f75727365222c202264617461223a7b226e616d65223a22426c6f636b636861696e20426173696373222c20226f776e6572223a22307866333946643665353161616438384636463463653661423838323732373963666646623932323636222c2022696d675f75726c223a2268747470733a2f2f6578616d706c652e636f6d2f636f757273652e706e67222c20226465736372697074696f6e223a22416e20696e74726f647563746f727920636f75727365206f6e20626c6f636b636861696e20746563686e6f6c6f67792e227d7d
  ```

  interact
  - *via `cartesi cli`*

    ```sh
    cartesi send generic \
      --dapp=0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e \
      --chain-id=31337 \
      --rpc-url=http://127.0.0.1:8545 \
      --mnemonic-passphrase='test test test test test test test test test test test junk' \
      --input=0x7b226d6574686f64223a226372656174655f636f75727365222c202264617461223a7b226e616d65223a22426c6f636b636861696e20426173696373222c20226f776e6572223a22307866333946643665353161616438384636463463653661423838323732373963666646623932323636222c2022696d675f75726c223a2268747470733a2f2f6578616d706c652e636f6d2f636f757273652e706e67222c20226465736372697074696f6e223a22416e20696e74726f647563746f727920636f75727365206f6e20626c6f636b636861696e20746563686e6f6c6f67792e227d7d
    ```

  - *via `cast`*

    ```sh
    cast send 0x59b22D57D4f067708AB0c00552767405926dc768 "addInput(address,bytes)" 0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e 0x7b226d6574686f64223a226372656174655f636f75727365222c202264617461223a7b226e616d65223a22426c6f636b636861696e20426173696373222c20226f776e6572223a22307866333946643665353161616438384636463463653661423838323732373963666646623932323636222c2022696d675f75726c223a2268747470733a2f2f6578616d706c652e636f6d2f636f757273652e706e67222c20226465736372697074696f6e223a22416e20696e74726f647563746f727920636f75727365206f6e20626c6f636b636861696e20746563686e6f6c6f67792e227d7d --mnemonic 'test test test test test test test test test test test junk'
    ```

* #### enroll_to_course

  ```js
  description — enroll a user to a given course.
  param data — {user_id: UUID, course_id: UUID}
  ```

  data sample

  ```json
  {
    "method":"enroll_to_course", 
    "data":{
      "user_id":"f9d9fd5e-9fd5-4ae5-9fd5-fd9fd59fd5fd",
      "course_id":"d8c04a7b-e207-4dfb-a1d2-c64e9d09c9e5"
    }
  }
  ```

  hex sample

  ``` 
  0x7b226d6574686f64223a22656e726f6c6c5f746f5f636f75727365222c202264617461223a7b22757365725f6964223a2266396439666435652d396664352d346165352d396664352d666439666435396664356664222c2022636f757273655f6964223a2264386330346137622d653230372d346466622d613164322d633634653964303963396535227d7d
  ```

  interact
  - *via `cartesi cli`*

    ```sh
    cartesi send generic \
      --dapp=0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e \
      --chain-id=31337 \
      --rpc-url=http://127.0.0.1:8545 \
      --mnemonic-passphrase='test test test test test test test test test test test junk' \
      --input=0x7b226d6574686f64223a22656e726f6c6c5f746f5f636f75727365222c202264617461223a7b22757365725f6964223a2266396439666435652d396664352d346165352d396664352d666439666435396664356664222c2022636f757273655f6964223a2264386330346137622d653230372d346466622d613164322d633634653964303963396535227d7d
    ```

  - *via `cast`*

    ```sh
    cast send 0x59b22D57D4f067708AB0c00552767405926dc768 "addInput(address,bytes)" 0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e 0x7b226d6574686f64223a22656e726f6c6c5f746f5f636f757

27365222c202264617461223a7b22757365725f6964223a2266396439666435652d396664352d346165352d396664352d666439666435396664356664222c2022636f757273655f6964223a2264386330346137622d653230372d346466622d613164322d633634653964303963396535227d7d --mnemonic 'test test test test test test test test test test test junk'
    ```

* #### create_lessons

  ```js
  description — adds a lesson to a given course.
  param data — {course_id: UUID, name: string, module: string, content: string}
  ```

  data sample

  ```json
  {
    "method":"create_lessons", 
    "data":{
      "course_id":"d8c04a7b-e207-4dfb-a1d2-c64e9d09c9e5",
      "name":"Lesson 1: Introduction",
      "module":"Module 1",
      "content":"This is the introduction to the course."
    }
  }
  ```

  hex sample

  ``` 
  0x7b226d6574686f64223a226164645f6c6573736f6e5f746f5f636f75727365222c202264617461223a7b22636f757273655f6964223a2264386330346137622d653230372d346466622d613164322d633634653964303963396535222c20226e616d65223a224c6573736f6e203a20496e74726f64756374696f6e222c20226d6f64756c65223a224d6f64756c652031222c2022636f6e74656e74223a22546869732069732074686520696e74726f64756374696f6e20746f2074686520636f757273652e227d7d
  ```

  interact
  - *via `cartesi cli`*

    ```sh
    cartesi send generic \
      --dapp=0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e \
      --chain-id=31337 \
      --rpc-url=http://127.0.0.1:8545 \
      --mnemonic-passphrase='test test test test test test test test test test test junk' \
      --input=0x7b226d6574686f64223a226164645f6c6573736f6e5f746f5f636f75727365222c202264617461223a7b22636f757273655f6964223a2264386330346137622d653230372d346466622d613164322d633634653964303963396535222c20226e616d65223a224c6573736f6e203a20496e74726f64756374696f6e222c20226d6f64756c65223a224d6f64756c652031222c2022636f6e74656e74223a22546869732069732074686520696e74726f64756374696f6e20746f2074686520636f757273652e227d7d
    ```

  - *via `cast`*

    ```sh
    cast send 0x59b22D57D4f067708AB0c00552767405926dc768 "addInput(address,bytes)" 0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e 0x7b226d6574686f64223a226164645f6c6573736f6e5f746f5f636f75727365222c202264617461223a7b22636f757273655f6964223a2264386330346137622d653230372d346466622d613164322d633634653964303963396535222c20226e616d65223a224c6573736f6e203a20496e74726f64756374696f6e222c20226d6f64756c65223a224d6f64756c652031222c2022636f6e74656e74223a22546869732069732074686520696e74726f64756374696f6e20746f2074686520636f757273652e227d7d --mnemonic 'test test test test test test test test test test test junk'
    ```


## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact

Project Link: [github.com/ikemHood/BlockEdu](https://github.com/ikemHood/BlockEdu)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
