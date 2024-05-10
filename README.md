# Messaging App

Welcome to our messaging app where you can stay connected with your friends and family. Our app allows you to receive different types of notifications, so you never miss an important message.

## Prerequisites

Before you can run our messaging app, you will need to install NVM (Node Version Manager) on your machine. NVM is a tool that allows you to manage multiple versions of Node.js on the same machine. Here are the steps to install NVM:

1. Open your terminal or command prompt.
2. Visit the NVM installation page at https://github.com/nvm-sh/nvm#installing-and-updating.
3. Follow the installation instructions for your operating system. For example, if you are using macOS, you can install NVM using Homebrew by running the command `brew install nvm`.
4. Once NVM is installed, you can verify that it is working by running the command `nvm --version`.
5. After nvm installation, install node version 20 using `nvm i 20`.

## Installation
To install the dependecies follow these commands in the root directory of project
```bash
chmod 700 install.sh
./install.sh
```

## Environment variables

### Server
When in server directory Run the following command to copy the .env example file
```bash
cp .env.example .env
```
It will create env for FIREBASE_CLOUD_MESSAGING_SERVER_KEY you need to enable cloud messaging service and use the server key here 
in order for notifications to work.

--------------–------------------------------

Generate service key and add it in server folder for admin sdk to works

--------------–------------------------------

### Client
When in client directory Run the following command to copy the .env example file
```bash
cp .env.example .env
```

Now paste the env variables based on the as per the firebase settings


## Server starting
To start the server, follow these steps:

1. Open your terminal and navigate to the client directory using the `cd` command. 
```bash
cd client
```

2. Once you are in the client directory, run the following command to start the client server:
```bash
npm start
```

3. After starting the client server, navigate to the server directory using the `cd` command. 
```bash
cd ../server
```

4. Once you are in the server directory, run the following command to start the server:
```bash
npm run dev
```

These commands will start both the client and server servers, allowing you to interact with your application.
This Markdown code demonstrates the steps to start the server by navigating to the client directory, starting the client server, navigating to the server directory, and starting the server.


## Note 
For database I have used sqlite. It will be automatically connected no need to add connection string
Postman collection is attached for testing.


## Loom video
https://www.loom.com/share/8e3851cb761b40d08854158a4bd03828