// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tickets {

    // 🔐 ROLES
    address public admin;
    address public verifier; // 👈 ADD THIS

    constructor(address _verifier) {
        admin = msg.sender;
        verifier = _verifier;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed");
        _;
    }

    modifier onlyVerifierOrAdmin() {
        require(
            msg.sender == verifier || msg.sender == admin,
            "Not allowed"
        );
        _;
    }

    // 🎟️ Ticket Structure
    struct TicketLocked{
        string ticketId;
        string ticketIdentifier;
        address owner;
        string eventId;
        string ticketLevel;
        bool isScanned;
        uint resellPrice;
        uint256 dateCreated;
        uint256 dateModified;
    }

    // 🎉 Event Structure
    struct Event {
        string eventId;
        uint maxSeats;
        uint bookedSeats;
        uint price; // in wei
    }

    mapping (string => TicketLocked) private tickets;
    mapping (string => Event) public events;

    string[] private ticketAccounts;

    // ================= EVENTS =================

    function createEvent(
        string memory _eventId,
        uint _maxSeats,
        uint _price
    ) public onlyAdmin {

        require(events[_eventId].maxSeats == 0, "Event exists");

        events[_eventId] = Event(_eventId, _maxSeats, 0, _price);
    }

    function getAvailableSeats(string memory _eventId)
    public view returns (uint) {
        return events[_eventId].maxSeats - events[_eventId].bookedSeats;
    }

    function getEventPrice(string memory _eventId)
    public view returns (uint) {
        return events[_eventId].price;
    }

    // ================= TICKETS =================

    function getTicketLocked(string memory tempTicketId)
    public view returns(TicketLocked memory){ 
        return tickets[tempTicketId]; 
    }

    // 🎟️ BOOK TICKET
    function createTicketLocked(
        string memory _ticketId,
        string memory _ticketIdentifier,
        string memory _eventId,
        string memory _ticketLevel
    ) public payable {

        require(events[_eventId].maxSeats > 0, "Event not exist");

        require(
            events[_eventId].bookedSeats < events[_eventId].maxSeats,
            "Seats Full"
        );

        require(tickets[_ticketId].owner == address(0), "Ticket exists");

        uint price = events[_eventId].price;

        require(msg.value >= price, "Not enough ETH");

        tickets[_ticketId] = TicketLocked(
            _ticketId,
            _ticketIdentifier,
            msg.sender,
            _eventId,
            _ticketLevel,
            false,
            0,
            block.timestamp,
            block.timestamp
        );

        ticketAccounts.push(_ticketId);
        events[_eventId].bookedSeats++;

        payable(admin).transfer(msg.value);
    }

    // ================= VERIFY =================

    // ✅ ONLY ADMIN OR VERIFIER CAN VERIFY
    function scanTicketLocked(string memory tempTicketID)
    public onlyVerifierOrAdmin {

        require(tickets[tempTicketID].owner != address(0), "Ticket not exist");
        require(!tickets[tempTicketID].isScanned, "Already scanned");

        tickets[tempTicketID].isScanned = true;
        tickets[tempTicketID].dateModified = block.timestamp;
    }

}