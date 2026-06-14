<<<<<<< HEAD

  # test

  Note: Please ensure you have installed <code><a href="https://nodejs.org/en/download/">nodejs</a></code>

  To preview and run the project on your device:
  1) Open project folder in <a href="https://code.visualstudio.com/download">Visual Studio Code</a>
  2) In the terminal, run `npm install`
  3) Run `npm start` to view project in browser
  
=======
# Blockchain-Based-Event-Ticketing-System
A decentralized event ticketing system built using Ethereum, Solidity, React.js, Truffle, Ganache, and MetaMask for secure ticket booking and verification.

## Overview

The Blockchain-Based Event Ticketing System is a decentralized application (DApp) developed using Ethereum blockchain technology. The project aims to provide a secure, transparent, and tamper-proof ticket management system for events. Traditional ticketing systems often face issues such as ticket fraud, duplication, and unauthorized reselling. This project solves these problems by storing ticket information on the blockchain.

The application allows administrators to create events, users to book tickets, and authorized personnel to verify tickets. Every transaction is recorded on the blockchain, ensuring transparency and security.

---

## Features

### Admin Features

* Create new events
* Set total available seats
* Define ticket prices
* View seat availability

### User Features

* Connect wallet using MetaMask
* Book tickets securely
* Receive an automatically generated Ticket ID
* View ticket details through a digital ticket slip

### Ticket Verification

* Verify ticket authenticity
* Prevent duplicate ticket usage
* Mark tickets as scanned after verification

### Blockchain Security

* Immutable ticket records
* Transparent transaction history
* Decentralized storage
* Protection against ticket fraud

---

## Technology Stack

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript

### Blockchain

* Solidity
* Ethereum
* Ganache

### Development Tools

* Truffle Framework
* MetaMask Wallet
* Web3.js

---

## System Architecture

1. Admin creates an event.
2. Event details are stored on the Ethereum blockchain.
3. Users connect their MetaMask wallet.
4. Users purchase tickets by paying the event price.
5. Smart contract generates a unique Ticket ID automatically.
6. Ticket information is stored on the blockchain.
7. Verifier validates the ticket during event entry.
8. Ticket status is updated to prevent reuse.

---

## Smart Contract Functions

### Event Management

* createEvent()
* getAvailableSeats()
* getEventPrice()

### Ticket Management

* createTicketLocked()
* getTicket()

### Verification

* scanTicketLocked()

---

## Installation Guide

### Prerequisites

Install the following software:

* Node.js
* npm
* Ganache
* MetaMask
* Truffle

### Clone Repository

```bash
git clone https://github.com/your-username/blockchain-event-ticketing.git
cd blockchain-event-ticketing
```

### Install Dependencies

```bash
npm install
```

### Start Ganache

Run Ganache on:

```bash
http://127.0.0.1:8545
```

Chain ID:

```bash
1337
```

### Compile Smart Contracts

```bash
truffle compile
```

### Deploy Smart Contracts

```bash
truffle migrate --reset
```

### Start React Application

```bash
npm start
```

Application URL:

```bash
http://localhost:3000
```

---

## MetaMask Configuration

1. Add Custom Network
2. RPC URL:

```bash
http://127.0.0.1:8545
```

3. Chain ID:

```bash
1337
```

4. Import Ganache Accounts using Private Keys.

---

## Project Workflow

### Event Creation

Admin creates an event by entering:

* Event ID
* Total Seats
* Ticket Price

### Ticket Booking

Users:

* Connect wallet
* Enter Event ID
* Purchase ticket

The smart contract automatically generates a Ticket ID.

### Ticket Verification

Verifier:

* Enters Ticket ID
* Verifies ticket authenticity

The ticket status changes from:

* Valid → Scanned

---

## Advantages

* Eliminates fake tickets
* Prevents ticket duplication
* Transparent transactions
* Secure ticket ownership
* Decentralized architecture
* Easy verification process

---

## Future Enhancements

* QR Code Integration
* PDF Ticket Generation
* NFT-Based Tickets
* Event Analytics Dashboard
* Mobile Application
* Ticket Resale Marketplace

---

## Project Screenshots

Add screenshots of:

1. Admin Dashboard
2. Event Creation Page
3. Ticket Booking Page
4. Ticket Slip
5. Ticket Verification Page

---

## Author

Ayush Gupta
Chandigarh University

## License

This project is developed for educational and academic purposes.
>>>>>>> 518c592a04e57c125264f1d1bca14da4238d4130
