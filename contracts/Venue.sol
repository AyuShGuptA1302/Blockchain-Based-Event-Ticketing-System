//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Venues{

    struct VenueLocked{
        string venueId;
        address owner;
        string venueName;
        string venueType;//Hotel,Stadium,Outdoor Venue,Concert Hall,Theater,Confrence Center
        string location;
        string description;
        uint64 venuePhoneNo;
        uint32 maxCapacity;
        string status; // available,pending,booked,unavailable
        uint dateCreated;  //change this to an array of the days booked
        uint dateModified;
    }

    struct PaymentDetails{
        string venueId;
        uint32 price;
        uint128 telebirrAccount;
        uint128 chapaAccount;
        uint128 cbeAccount;
    }
    struct VenueService{
        string venueId;
        string catering;
        string parking;
        string bar;
        string staffing;
        string decore;
        string audiovisual;
    }
    struct VenuePhotoAddress{
        string venueId;
        string photo1;
        string photo2;
        string photo3;
    }
    struct BookedDates{
        string venueId;
        uint date;
    }

//mappig the structs
    mapping (string => VenueLocked) private venues;
    string[] private venueAccounts;

    mapping (string => PaymentDetails) private paymentDetails;

    mapping (string => VenueService) private venueService;

    mapping (string => VenuePhotoAddress) private venuePhotoAddress;

    mapping (uint => BookedDates) private bookedDate;
    uint[] private _bookedId;
    
//modifiers

    modifier isDateAvailable(string memory _venueId, uint _date) {
        for(uint i=0; i < _bookedId.length; i++){
            if(keccak256(abi.encodePacked(_venueId)) == keccak256(abi.encodePacked(bookedDate[i].venueId))){
                if( ((_date) > (bookedDate[i].date - 1 days)) && ((_date) < (bookedDate[i].date + 1 days)) ){
                    revert("Date Already Booked!");
                }
            }
        }
        _;
    }

    modifier checkVenueStatus(string memory _status) {
        require(
            keccak256(abi.encodePacked(_status)) ==
                keccak256(abi.encodePacked("Available")) ||
                keccak256(abi.encodePacked(_status)) ==
                keccak256(abi.encodePacked("Pending")) ||
                keccak256(abi.encodePacked(_status)) ==
                keccak256(abi.encodePacked("Booked")) ||
                keccak256(abi.encodePacked(_status)) ==
                keccak256(abi.encodePacked("Unavailable")),
            "Wrong Status"
        );
        _;
    }

    modifier checkVenueType(string memory _venueType) {
        require(
            keccak256(abi.encodePacked(_venueType)) ==
                keccak256(abi.encodePacked("Hotel")) ||
                keccak256(abi.encodePacked(_venueType)) ==
                keccak256(abi.encodePacked("Stadium")) ||
                keccak256(abi.encodePacked(_venueType)) ==
                keccak256(abi.encodePacked("Outdoor Venue")) ||
                keccak256(abi.encodePacked(_venueType)) ==
                keccak256(abi.encodePacked("Concert Hall")) ||
                keccak256(abi.encodePacked(_venueType)) ==
                keccak256(abi.encodePacked("Theater")) ||
                keccak256(abi.encodePacked(_venueType)) ==
                keccak256(abi.encodePacked("Confrence Center")),
            "Wrong venue type"
        );
        _;
    }

    modifier isAccountExist(string memory _venueId){
        require(keccak256(abi.encodePacked(venues[_venueId].venueId)) != keccak256(abi.encodePacked(_venueId)),"Account already exists");
        _;
    }

    modifier checkTheOwner(address _owner,string memory _venueId){
        require(venues[_venueId].owner == _owner,"The owner is not the same");
        _;
    }

    modifier isAccountAvailable(string memory _venueId){
        require(keccak256(abi.encodePacked(_venueId)) == keccak256(abi.encodePacked(venues[_venueId].venueId)),"Account doesnt exists");
            _;
    }

//get all the venue ID's
    function getVenueIDList() public view returns(string[] memory) {
        return venueAccounts;
    }
    
    function getBookedId() public view returns(uint[] memory) {
        return _bookedId;
    }

    function getAllBookedDates() public view returns(BookedDates[] memory) {
        BookedDates[] memory tempDates = new BookedDates[](_bookedId.length);
        for (uint256 i=0; i<_bookedId.length; i++){
            tempDates[i]= bookedDate[i];
        } 
        return tempDates;
    }

//check if the venue ID is available
    function checkVenueIDExistance(string memory tempVenueID)
    public view returns(bool){
        for (uint256 i=0; i<venueAccounts.length; i++){
            if (keccak256(abi.encodePacked(tempVenueID))==keccak256(abi.encodePacked(venueAccounts[i])))
            return true;
        }
        return false;
    }

//creating a venue
    function createVenueLocked(
        string memory _venueID,
        string memory _venueName,
        string memory _venueType,
        string memory _location,
        string memory _description,
        uint64 _venuePhoneNo,
        uint32 _maxCapacity
    )isAccountExist(_venueID) checkVenueType(_venueType) public {
        venues[_venueID]=VenueLocked(
        _venueID,
        msg.sender,
        _venueName,
        _venueType,
        _location,
        _description,
        _venuePhoneNo,
        _maxCapacity,
        "Available",
        block.timestamp,
        block.timestamp
        );
        venueAccounts.push(_venueID);
    }

//this function will add the address of the venue photos
    function addVenuePhotoLocked(
        string memory _venueId, 
        string memory _venuePhotoAddress1,
        string memory _venuePhotoAddress2,
        string memory _venuePhotoAddress3
    )isAccountAvailable(_venueId) checkTheOwner(msg.sender,_venueId) public {
        venuePhotoAddress[_venueId]=VenuePhotoAddress(
            _venueId,
            _venuePhotoAddress1,
            _venuePhotoAddress2,
            _venuePhotoAddress3
        );
    }

//this function will add the payment informations of the venue
    function addPaymentDetails(
        string memory _venueId, 
        uint32 _price,
        uint128 _telebirrAccount,
        uint128 _chapaAccount,
        uint128 _cbeAccount
    )isAccountAvailable(_venueId) checkTheOwner(msg.sender,_venueId) public {
        paymentDetails[_venueId]=PaymentDetails(
            _venueId,
            _price,
            _telebirrAccount,
            _chapaAccount,
            _cbeAccount
        );
    }

//this function will add the services the venue provides
    function addVenueService(
        string memory _venueId, 
         string memory _catering,
         string memory _parking,
         string memory _bar,
         string memory _staffing,
         string memory _decore,
         string memory _audiovisual
    )isAccountAvailable(_venueId) checkTheOwner(msg.sender,_venueId) public {
        venueService[_venueId]=VenueService(
            _venueId,
            _catering,
            _parking,
            _bar,
            _staffing,
            _decore,
            _audiovisual
        );
    }

//this function will check if the date is taken
    function checkIsDateBooked(string memory _venueId,uint _date)
    isAccountAvailable(_venueId)  view public returns(bool) {
        for(uint i=0; i < _bookedId.length; i++){
            if(keccak256(abi.encodePacked(_venueId)) == keccak256(abi.encodePacked(bookedDate[i].venueId))){
                if( ((_date) > (bookedDate[i].date - 1 days)) && ((_date) < (bookedDate[i].date + 1 days)) ){
                    return(true);
                }
            }
        }
        return(false);
    }

//this function will add the dates the venue is booked
    function addBookedDate(
        string memory _venueId, 
        uint256 _date
    )isAccountAvailable(_venueId) 
    isDateAvailable(_venueId,_date) public {
        bookedDate[(_bookedId.length)]=BookedDates(
            _venueId,
            _date
        );
        _bookedId.push(_date);
    }

//return the dates the venue is booked
    function getBookedDates(string memory _venueId) view public   
    isAccountAvailable(_venueId) returns(BookedDates[] memory){
        uint256 temp=0;
        for (uint256 i=0; i<_bookedId.length; i++){
            if ((keccak256(abi.encodePacked(bookedDate[i].venueId)))==(keccak256(abi.encodePacked(_venueId)))){
                temp++;
            }
        }
        BookedDates[] memory tempDates = new BookedDates[](temp);
        uint256 temp3=0;
        for (uint256 i=0; i<_bookedId.length; i++){
            if ((keccak256(abi.encodePacked(bookedDate[i].venueId)))==(keccak256(abi.encodePacked(_venueId)))){
                tempDates[temp3]= bookedDate[i];
                temp3++;
            }
        } 
        return tempDates;
    }
    

//this function will update the status of the venue
    function updateStatusVenueLocked(
        string memory _venueId, 
        string memory _status 
    )checkVenueStatus(_status) 
    isAccountAvailable(_venueId) public { // change the ownwer
        venues[_venueId].status=_status;
        venues[_venueId].dateModified=block.timestamp;
    }

//return all information about a certain venue
    function getVenueLocked(
        string memory _venueId
        )isAccountAvailable(_venueId) public view 
        returns(VenueLocked memory){ 
        return venues[_venueId]; 
    }
//return all information about a certain venue payment detail
    function getPaymentDetails(string memory _venueId)  
    public view isAccountAvailable(_venueId)
    returns(PaymentDetails memory){ 
        return paymentDetails[_venueId]; 
    }
//return all information about a certain venue service
    function getVenueService(string memory _venueId)  
    public view isAccountAvailable(_venueId)
    returns(VenueService memory){ 
        return venueService[_venueId]; 
    } 
//return all information about a certain venue photo address
    function getPhotoAddress(string memory _venueId)  
    public view isAccountAvailable(_venueId)
    returns(VenuePhotoAddress memory){ 
        return venuePhotoAddress[_venueId]; 
    } 

//return all photo information about all venues
    function getAllPhotoAddress() public view  
    returns(VenuePhotoAddress[] memory){
        VenuePhotoAddress[] memory tempVenues = new VenuePhotoAddress[](venueAccounts.length);
        for (uint256 i=0; i<venueAccounts.length; i++){
            tempVenues[i]= venuePhotoAddress[venueAccounts[i]];
        } 
        return tempVenues;
    }

//return all information about all venues
    function getAllVenuesLocked() public view  
    returns(VenueLocked[] memory){
        VenueLocked[] memory tempVenues = new VenueLocked[](venueAccounts.length);
        for (uint256 i=0; i<venueAccounts.length; i++){
            tempVenues[i]= venues[venueAccounts[i]];
        } 
        return tempVenues;
    }

//return all information about all venues the user owns
    function getOwnedVenues() view public   
    returns(VenueLocked[] memory){
        uint256 temp=0;
        for (uint256 i=0; i<venueAccounts.length; i++){
            if (venues[venueAccounts[i]].owner==msg.sender){
                temp++;
            }
        }
        VenueLocked[] memory tempVenues = new VenueLocked[](temp);
        uint256 temp3=0;
        for (uint256 i=0; i<venueAccounts.length; i++){
            if (venues[venueAccounts[i]].owner==msg.sender){
                tempVenues[temp3]= venues[venueAccounts[i]];
                temp3++;
            }
        } 
        return tempVenues;
    }


//this function deletes a venue
    function deleteVenue(
        string memory _venueId
        )isAccountAvailable(_venueId) public {
        delete venues[_venueId];
        for (uint256 i=0; i<venueAccounts.length; i++){
            if (keccak256(abi.encodePacked(_venueId))==keccak256(abi.encodePacked(venueAccounts[i]))){
            venueAccounts[i]=venueAccounts[venueAccounts.length-1];
            venueAccounts.pop();
            break; 
            }
        }
    }
}