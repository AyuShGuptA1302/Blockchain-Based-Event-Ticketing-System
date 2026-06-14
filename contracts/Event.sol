//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Events{

    struct EventLocked{
        string eventId;
        address owner;
        string venueId;
        string eventName;
        string eventType;
        string description;
        uint eventPhoneNo;
        string status; // available,unavailable, accepted
        string eventPhotoAddress;
        uint eventDate;
        uint256 dateCreated;
        uint256 dateModified;
    }

    struct EventTicketsDetail{
        string eventId;
        uint256 normalPrice;
        uint256 vipPrice;
        uint256 vipTickets; //add normal tickets
        uint256 normalTickets;
        uint256 age;
        string staffUsername;
        string staffPassword;
    }

    struct PaymentDetails{
        string eventId;
        uint128 telebirrAccount;
        uint128 chapaAccount;
        uint128 cbeAccount;
    }

//maps for the structs
    mapping (string => EventLocked) private events;
    string[] private eventAccounts;

    mapping (string => PaymentDetails) private paymentDetails;

    mapping (string => EventTicketsDetail) private eventTicket;
    
    //EventStaff private temp2= EventStaff("","","");
    //EventTicketsLocked private temp1= EventTicketsLocked(tempForArray,0,0,0,0,0,temp2);

//modifiers

///////////////////////////////////////////////////////////////////////////edit event types
    modifier checkEventType(string memory _eventType) {
        require(
            keccak256(abi.encodePacked(_eventType)) ==
                keccak256(abi.encodePacked("Hotel")) ||
                keccak256(abi.encodePacked(_eventType)) ==
                keccak256(abi.encodePacked("Stadium")) ||
                keccak256(abi.encodePacked(_eventType)) ==
                keccak256(abi.encodePacked("Outdoor Venue")) ||
                keccak256(abi.encodePacked(_eventType)) ==
                keccak256(abi.encodePacked("Concert Hall")) ||
                keccak256(abi.encodePacked(_eventType)) ==
                keccak256(abi.encodePacked("Theater")) ||
                keccak256(abi.encodePacked(_eventType)) ==
                keccak256(abi.encodePacked("Confrence Center")),
            "Wrong event type"
        );
        _;
    }

    modifier isAccountExist(string memory _eventId){
        require(keccak256(abi.encodePacked(events[_eventId].eventId)) != keccak256(abi.encodePacked(_eventId)),"Account already exists");
        _;
    }

    modifier checkTheOwner(address _owner,string memory _eventId){
        require(events[_eventId].owner == _owner,"The owner is not the same");
        _;
    }

    modifier isAccountAvailable(string memory _eventId){
        require(keccak256(abi.encodePacked(_eventId)) == keccak256(abi.encodePacked(events[_eventId].eventId)),"Account doesnt exists");
            _;
    }


// function to get all the event IDs list
    function getEventIDList() public view returns(string[] memory) {
        return eventAccounts;
    }

// function to check event existance
    function checkEventIDExistance(string memory tempEventID)
    public view returns(bool){
        for (uint256 i=0; i<eventAccounts.length; i++){
            if (keccak256(abi.encodePacked(tempEventID))==keccak256(abi.encodePacked(eventAccounts[i])))
            return true;
        }
        return false;
    }

//create an event function one
    function createEventLocked(
        string memory _eventId,
        string memory _venueId,
        string memory _eventName,
        string memory _eventType,
        string memory _description,
        uint _eventPhoneNo,
        uint _eventDate,
        string memory _eventPhotoAddress
    )  public returns(string memory){
        
        events[_eventId]=EventLocked(
        _eventId,
        msg.sender,
        _venueId,
        _eventName,
        _eventType,
        _description,
        _eventPhoneNo,
        "Unavailable",
        _eventPhotoAddress,
        _eventDate,
        block.timestamp,
        block.timestamp
        );
        
        eventAccounts.push(_eventId);
        return _eventId;
    }

// create event function two
    function createEvent2Locked(
        string memory _eventId,
        uint256 _normalPrice,
        uint256 _vipPrice,
        uint256 _vipTickets,
        uint256 _normaltickets,
        uint256 _age
    )  public returns(string memory){
        
        eventTicket[_eventId]=EventTicketsDetail(
        _eventId,
        _normalPrice,
        _vipPrice,
        _vipTickets,
        _normaltickets,
        _age,
        "",
        ""
        );
        
        return _eventId;
    }

//this function will add the payment informations of the event
    function addPaymentDetails(
        string memory _eventId, 
        uint128 _telebirrAccount,
        uint128 _chapaAccount,
        uint128 _cbeAccount
    )isAccountAvailable(_eventId) checkTheOwner(msg.sender,_eventId) public {
        paymentDetails[_eventId]=PaymentDetails(
            _eventId,
            _telebirrAccount,
            _chapaAccount,
            _cbeAccount
        );
    }

//create staff 
    function createStaff(
        string memory _eventId,
        string memory _staffUsername,
        string memory _staffPassword
    ) public{
        eventTicket[_eventId].staffUsername=_staffUsername;
        eventTicket[_eventId].staffPassword=_staffPassword;
    } 

//return the events Id of the events that are hosted at this venue 
    function checkVenueRequest(string memory _venueId)public view returns(string[] memory){
        string[] memory tempIdHolder;
        for (uint256 i=0; i<eventAccounts.length; i++){
            if (keccak256(abi.encodePacked(events[eventAccounts[i]].venueId))==keccak256(abi.encodePacked(_venueId))){
                tempIdHolder[tempIdHolder.length]=events[eventAccounts[i]].eventId;
            }
        }
        return tempIdHolder;
    }

//change the status of the event to available when the event paid the money
    function eventPay(
        string memory _eventId,
        string memory _status
    )public {
        events[_eventId].status=_status;
    } 

//return all information about a certain event
    function getEvent1Locked(string memory tempEventID)  
    public view 
    returns(EventLocked memory){ 
        return events[tempEventID]; 
    } 
    function getEvent2Locked(string memory tempEventID)  
    public view 
    returns(EventTicketsDetail memory){ 
        return eventTicket[tempEventID]; 
    } 
    
  function getEvent3Locked(string memory tempEventID)  
    public view 
    returns(PaymentDetails memory){ 
        return paymentDetails[tempEventID]; 
    } 
//return all information about all events
    function getAllEvents1Locked() public view  
    returns(EventLocked[] memory){
        EventLocked[] memory tempEvents = new EventLocked[](eventAccounts.length);
        for (uint256 i=0; i<eventAccounts.length; i++){
            tempEvents[i]= events[eventAccounts[i]];
        } 
        return tempEvents;
    }

    function getAllEvents2Locked() public view  
    returns(EventTicketsDetail[] memory){
        EventTicketsDetail[] memory tempEvents = new EventTicketsDetail[](eventAccounts.length);
        for (uint256 i=0; i<eventAccounts.length; i++){
            tempEvents[i]= eventTicket[eventAccounts[i]];
        } 
        return tempEvents;
    }

//gets the events the owner owns
    function getOwnedEvents1Locked() view public   
    returns(EventLocked[] memory){
        uint256 temp=0;
        for (uint256 i=0; i<eventAccounts.length; i++){
            if (events[eventAccounts[i]].owner==msg.sender){
                temp++;
            }
        }
        EventLocked[] memory tempEvents = new EventLocked[](temp);
        uint256 temp3=0;
        for (uint256 i=0; i<eventAccounts.length; i++){
            if (events[eventAccounts[i]].owner==msg.sender){
                tempEvents[temp3]= events[eventAccounts[i]];
                temp3++;
            }
        } 
        return tempEvents;
    }


    function getOwnedEvents2Locked() view public   
    returns(EventTicketsDetail[] memory){
        uint256 temp=0;
        for (uint256 i=0; i<eventAccounts.length; i++){
            if (events[eventAccounts[i]].owner==msg.sender && 
            keccak256(abi.encodePacked(events[eventAccounts[i]].eventId))==
            keccak256(abi.encodePacked(eventTicket[eventAccounts[i]].eventId))){
                temp++;
            }
        }

        uint256 temp3=0;
        EventTicketsDetail[] memory tempEvents = new EventTicketsDetail[](temp);
        for (uint256 i=0; i<eventAccounts.length; i++){
            if (events[eventAccounts[i]].owner==msg.sender && 
            keccak256(abi.encodePacked(events[eventAccounts[i]].eventId))==
            keccak256(abi.encodePacked(eventTicket[eventAccounts[i]].eventId))){
                tempEvents[temp3]= eventTicket[eventAccounts[i]];
                temp3++;
            }
        } 
        
        return tempEvents;
    }

    function getOwnedEvents3Locked() view public   
    returns(EventLocked[] memory,EventTicketsDetail[] memory){
        uint256 temp=0;
        for (uint256 i=0; i<eventAccounts.length; i++){
            if (events[eventAccounts[i]].owner==msg.sender && 
            keccak256(abi.encodePacked(events[eventAccounts[i]].eventId))==
            keccak256(abi.encodePacked(eventTicket[eventAccounts[i]].eventId))){
                temp++;
            }
        }
        EventLocked[] memory tempEvents1 = new EventLocked[](temp);
        uint256 temp3=0;
        for (uint256 i=0; i<eventAccounts.length; i++){
            if (events[eventAccounts[i]].owner==msg.sender){
                tempEvents1[temp3]= events[eventAccounts[i]];
                temp3++;
            }
        }
        temp3=0;
        EventTicketsDetail[] memory tempEvents2 = new EventTicketsDetail[](temp);
        for (uint256 i=0; i<eventAccounts.length; i++){
            if (events[eventAccounts[i]].owner==msg.sender && 
            keccak256(abi.encodePacked(events[eventAccounts[i]].eventId))==
            keccak256(abi.encodePacked(eventTicket[eventAccounts[i]].eventId))){
                tempEvents2[temp3]= eventTicket[eventAccounts[i]];
                temp3++;
            }
        } 
        
        return (tempEvents1,tempEvents2);
    }

    function returnEventAge(string memory _eventId)public view returns(uint){
        return eventTicket[_eventId].age;
    }

//delete a certain event
    function deleteEventLocked(
        string memory tempEventID 
        )public {
        delete events[tempEventID];
        delete eventTicket[tempEventID];
        for (uint256 i=0; i<eventAccounts.length; i++){
            if (keccak256(abi.encodePacked(tempEventID))==keccak256(abi.encodePacked(eventAccounts[i]))){
            eventAccounts[i]=eventAccounts[eventAccounts.length-1];
            eventAccounts.pop();
            break; 
            }
        }
    }
}

