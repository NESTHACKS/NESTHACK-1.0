# EventZea

## URL - https://eventzea.netlify.app/

===============================

## Table of Contents

- [Introduction](#introduction)

- [Stack](#stack)

- [Contract](#contract)

- [Testing](#testing)

- [Usage](#usage)

- [Contributing](#contributing)

- [Licence](#usage)

## Introduction

EventZea is a Web3 application that allows creators to create events and users to buy event tickets, it also gives users the ability to sell their tickets at any amount they want. Event creator can view their earnings and withdraw their earnings whenever they want. Payment from tickets of users that listed their tickets are received directly into their wallets. Event creators can use the event check page to verify those who are attending their event. The ticket can only be purchased with BUSD (stable coin), this is to prevent instability in price.

The smart contract takes 10% of any ticket sales.

# Stack

Backend - Solidity

FrontEnd - React Js

Interacting with the Blockchain - Ether Js

Blockchain - Rinkeby

## Contract

Eventpool Contract Address - 0xbC6b1605eAFc28E94e38875A97E7d461436Caf81

BUSD Contract Address - 0x12426a6f6187f36ddfc0850b5a86aaa85fd42187

## Testing

In order to test the application, Test busd will be needed.

Contract to grab test busd - 0x83B939A4B7739BE7592259f8921c430C320457dD

You can use grab function to get busd needed to successfully test the application

## Usage

# How to setup the repo

# Pre-requisite

1. You need to have [Node.js](https://nodejs.org/en/) installed.
2. You should also install [VS Code](https://code.visualstudio.com/)

# Running the application locally

1.  Clone this repository

    `git clone https://github.com/Nestcoin-Hackaton-1/Eventpool-smartcontract.git`

2.  Install dependencies

    `cd Eventpool-smartcontract`

    `npm install`

3.  Setup your env from .env.example

4.  Compile and Deploy the busd contract with the script provided

    `npx hardhat run scripts/deploybusd.js --network [network you intend to use]`

5.  Copy the Contract address derived from the busd deployment and insert it into the deploy script for the EventPool

        `const eventpool = await EventPool.deploy(

    "BUSD Contract address"
    );`

        `  await hre.run("verify:verify", {

    address: eventpool.address,
    constructorArguments: ["BUSD Contract address"],
    });`

6.  Compile and Deploy the EventPool contract with the script provided

    `npx hardhat run scripts/deploy.js --network [network you intend to use]`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
