// To integrate the Gnosis Safe module with multi-signature control and token voting roles

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@gnosis.pm/safe-contracts/contracts/GnosisSafe.sol";
import "@gnosis.pm/safe-contracts/contracts/interfaces/IERC20.sol";

contract StarRenaming {
    GnosisSafe public gnosisSafe;
    string public oldStarName;
    string public newStarName;
    bool public voteStatus;
    uint256 public voteThreshold;
    IERC20 public token;
    
    mapping(address => bool) public hasVoted;
    mapping(address => bool) public isParticipant;
    uint256 public yesVotes;
    uint256 public noVotes;
    
    modifier onlySafe() {
        require(gnosisSafe.isOwner(msg.sender), "Only Gnosis Safe can perform this action");
        _;
    }
    
    constructor(
        address _gnosisSafe,
        string memory _oldStarName,
        address _token,
        uint256 _voteThreshold
    ) {
        gnosisSafe = GnosisSafe(_gnosisSafe);
        oldStarName = _oldStarName;
        token = IERC20(_token);
        voteThreshold = _voteThreshold;
    }
    
    function createCampaign(string memory _newStarName) public onlySafe {
        require(bytes(newStarName).length == 0, "Campaign already created");
        newStarName = _newStarName;
        voteStatus = false;
        yesVotes = 0;
        noVotes = 0;
    }
    
    function joinCampaign() public {
        require(!isParticipant[msg.sender], "Already joined the campaign");
        isParticipant[msg.sender] = true;
    }
    
    function vote(bool _approve) public {
        require(bytes(newStarName).length > 0, "No campaign exists");
        require(!voteStatus, "Vote already concluded");
        require(isParticipant[msg.sender], "Not a participant");
        require(!hasVoted[msg.sender], "Already voted");
        
        hasVoted[msg.sender] = true;
        if (_approve) {
            yesVotes++;
        } else {
            noVotes++;
        }
        
        if (yesVotes >= voteThreshold) {
            voteStatus = true;
        } else if (noVotes >= voteThreshold) {
            voteStatus = false;
        }
    }
    
    function renameStar() public onlySafe {
        require(bytes(newStarName).length > 0, "No campaign exists");
        require(voteStatus, "Vote has not concluded");
        // Deploy a new contract to store the star renaming details
        StarDetails newStarDetails = new StarDetails(oldStarName, newStarName, participantsWhoApproved);
        // Perform any additional logic with the new contract, such as storing its address or emitting an event

        // Reset the campaign data for the next renaming
        delete participantsWhoApproved;
        delete participants;
        oldStarName = newStarName;
    }
    
    function withdrawTokens(address _recipient, uint256 _amount) public onlySafe {
        token.transfer(_recipient, _amount);
    }
}
contract StarDetails {
    string public oldStarName;
    string public newStarName;
    address[] public participants;

    constructor(
        string memory _oldStarName,
        string memory _newStarName,
        address[] memory _participants
    ) {
        oldStarName = _oldStarName;
        newStarName = _newStarName;
        participants = _participants;
    }
}