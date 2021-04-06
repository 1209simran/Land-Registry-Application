
# Land Registry Application using Ethereum Blockchain

![](https://github.com/1209simran/Land-Registry-Application/blob/master/src/images/home.png?raw=true)

## Abstract

Developed a decentralized application using Blockchain which could overcome the short-comings of the existing process of land registry. Through Blockchain, it is possible to keep track of how property changes hand to hand. For buyers, sellers and Government registrars, it is easier to transfer the land ownership from a seller to a new buyer without any intermediaries.  It provides immutability, auditability, traceability, and anonymity features which attracts the people around the globe to implement its decentralization feature in the land registry process.  It also accelerates the process of registration and provides transparency to the system.

## Technologies Used

- ReactJS
- NodeJS
- MongoDB
- Solidity
- IPFS

## Prerequisites

#### Install Node JS
Refer to https://nodejs.org/en/ to install nodejs.

#### Install Ganache
Refer to https://www.trufflesuite.com/ganache to install Ganache.

#### Install Truffle
Install truffle npm package globally. Use the following command to install truffle
`$ npm install -g truffle`

#### Install Metamask Chrome Extension
Refer to https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en to download the extension.

#### Make an account on MongoDB Altas
https://www.mongodb.com/cloud/atlas

#### Create an account on Vonage (Previously Nexmo)
https://dashboard.nexmo.com/sign-up

## Getting Started
To set up the project, go along with the following steps:-
- Clone the repository. <br/>
`$ git clone https://github.com/1209simran/Land-Registry-Application.git`
- Go to the directory with the repository. <br/>
`$ cd folder_name`
- Run **npm install** (or **yarn install** if you use yarn) to download the npm packages. <br/>
`$ npm install`
- Open Ganache.
- Run **truffle compile** to compile the truffle project. <br/>
`$ truffle compile`
- Run **truffle migrate** to deploy the contracts. <br/>
`$ truffle migrate`
- Run **npm start** to start the project. <br/>
`$ npm start`
- Open another terminal and navigate to the **Server** folder. <br/>
`$ cd Server`
- Run **npm install** (or **yarn install** if you use yarn) to download the npm packages. <br/>
`$ npm install`
- Navigate to the **backend** folder then to the **Config** folder. <br/>
`$ cd backend/Config`
- Change the credentials of **db_config.js** .
- Run the server using this command:- <br/>
`$ npm start`
- Open another terminal and execute the following command to add the government registrar detail to the database. <br/>
`$ curl -X POST http://localhost:3001/register_govt`
- Credentials for government login:- <br/>
Username:- Delhi Government <br/>
Password:- Delhi
- You're all done. Enjoy!

## Workflow
#### Registration of users and property
- Visit http://localhost:3000/signup to register on the platform. On clicking the submit button, user will be redirected to the login page.
- To login, user must provide their private key.
- To register the property, choose **Register Land** tab from the dashboard and fill all the details related to the property and owner.  After submitting the form user's application is then verified by the government authority.

#### Validation from government authority
- In this step, government authority audits the user's land details and has the right to approve or decline their application.
- During the time of Registration of land, users have to upload the legal documents of land so that the government and the buyer can verify it. If rejected, the user has to submit a new application, and it cannot be available for other users to buy. And if it gets accepted, then the owner of the land has the option to make their land available to sell.
- There is an amazing feature, as and when Government accepts or rejects the request, a notification will be sent to the user through mail and SMS. NEXMO API and Nodemailer API are used to for sending notifications. Through this user can get the status of their application on their phone and mail and do not have to check the account again and again.

#### Transaction between both the parties
This step has several stages involved. There is no intermediary in between, and there is no need for any central authority to verify the transaction process. The owner of land can sell the land as a whole means there is no partial transaction. Following are the steps required:-
- **Making the land available**
Once the Government is approving it, the landowner has the option to make their land available to other users.
- **Sending request to the landowner to purchase**
When the land is available to buy, the buyer moves toward their dashboard, and in the available properties section, they search for the property and send a request to the landowner to buy it.
- **Viewing the request**
Land proprietor views the buyer's requests and after communicating with them, plans whether to allow them to buy the land or not. They have the option to accept or decline the request.
- **Processing the request**
Once the landowner views the requester address and if it founds to be the right one, then the seller accepts the request.
- **Buying the property**
Once the request is approved, the buyer can now buy the property. If approved, then the amount of the property gets deducted from the buyer's account, and the amount is transferred to the land owner's account. They can check their wallet by viewing their profile. After a successful transaction, ownership of the previous landowner from the asset's list will be removed.



The whole process is conducted in the form of the smart contract, which ensures that the process is immutable, secured and digitized. No one in between can tamper the data, and authenticity is maintained throughout the process. There is no human error involved. Paperwork will be reduced, and most importantly, everything will become transparent. Chances of fraud cases will get reduced. The public ledger can be used in case there is any doubt regarding the land ownership claim. The documents are digitally signed, which leads to the transfer of land title upon payment in cryptocurrency.


**In case of any query, please feel free to contact me.**
