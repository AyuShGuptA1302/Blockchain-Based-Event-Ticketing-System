//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Users{

    struct UserLocked{
        string firstName;
        string lastName;
        string email;
        string username;
        string password;
        address account;
        uint phoneNo;
        uint8 age;
        string role; //venue client or event 
        bool status; //verified or not
        string idPhotoAddress;
    }

    mapping (address => UserLocked) private user;
    address[] private userAccounts;

//modifiers for users
    modifier checkThePassword(string memory _password){
        require(keccak256(abi.encodePacked(user[msg.sender].password))==keccak256(abi.encodePacked(_password)),"Wrong Password");
        _;
    }

    modifier isAccountExist(address tempUserAccount){
        require(!userAccountExistanceLocked(tempUserAccount),"Account already exists");
        _;
    }

    modifier checkTheOwner(address _account){
        require( _account==msg.sender ,"The owner is not the same");
        _;
    }

    modifier isAccountAvailable(address tempUserAccount){
        require(userAccountExistanceLocked(tempUserAccount),"Account is not found");
        _;
    }

    modifier checkUserRole(string memory _role){
        require(keccak256(abi.encodePacked(_role))==keccak256(abi.encodePacked("Client"))||
        keccak256(abi.encodePacked(_role))==keccak256(abi.encodePacked("Event"))||
        keccak256(abi.encodePacked(_role))==keccak256(abi.encodePacked("Venue")),"Wrong Role");
        _;
    }
    
//returns all the users addresses
    function userAccountListLocked() public view returns(address[] memory) {
        return userAccounts;
    }

//check if the user address exists
    function userAccountExistanceLocked(address tempUserAccount)
    public view returns(bool){
        for (uint256 i=0; i<userAccounts.length; i++){
            if (tempUserAccount == userAccounts[i])
            return true;
        }
        return false;
    }

// created a new user
     function createUserLocked( 
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _username,
        string memory _password,
        uint _phoneNo,
        uint8 _age,
        string memory _role
    ) public {
        address _account= msg.sender;
        user[_account]=UserLocked(
        _firstName,
        _lastName,
        _email,
        _username,
        _password,
        _account,
        _phoneNo,
        _age,
        _role,
        false,
        "");
        userAccounts.push(_account);
    }

//verify the user login
    function verifyUser(
        string memory _password
        )public view returns(bool) {
            if(keccak256(abi.encodePacked(user[msg.sender].password))==keccak256(abi.encodePacked(_password))){
                return true;
            }
            else{
                return false;
            }
        }

    function verifyUser2(
        string memory _password
        )checkThePassword(_password) public view returns(UserLocked memory) {
            return user[msg.sender];
        }

//this function will add the address us the users photo
    function addUserIdPhotoLocked(
        address _account, 
        string memory _idPhotoAddress
        )isAccountAvailable(_account) public {
            user[_account].idPhotoAddress=_idPhotoAddress;
            user[_account].status=true;
        }

//return all information about a certain user
    function getUserLocked(address tempAddress) public view  
    isAccountAvailable(tempAddress) returns(UserLocked memory){ 
        return user[tempAddress]; 
    }

//return all information about all users
    function getAllUsersLocked() view public   
    returns(UserLocked[] memory){
        UserLocked[] memory tempUsers = new UserLocked[](userAccounts.length);
        for (uint256 i=0; i<userAccounts.length; i++){
            tempUsers[i]= user[userAccounts[i]];
        } 
        return tempUsers;
    }

//this function will update the user data
    function updateUserLocked( 
        address _account,
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _username,
        string memory _password,
        uint _phoneNo
    ) isAccountAvailable(_account) public {
        user[_account].firstName=_firstName;
        user[_account].lastName=_lastName;
        user[_account].email=_email;
        user[_account].username=_username;
        user[_account].password=_password;
        user[_account].phoneNo=_phoneNo;
    }    

//This function will delete a user
    function deleteUserLocked(address tempAddress) 
    isAccountAvailable(tempAddress) checkTheOwner(tempAddress) public {
        delete user[tempAddress];             //check if the msg.sender is the address/////////////
        for (uint256 i=0; i<userAccounts.length; i++){
            if (tempAddress == userAccounts[i]){
            userAccounts[i]=userAccounts[userAccounts.length-1];
            userAccounts.pop();
            break; 
            }
        }
    }
}