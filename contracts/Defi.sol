// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Defi is ERC20 {
    using SafeMath for uint256;

    struct Stake {
        uint256 amount;
        uint256 startTime;
    }

    mapping(address => Stake) public StakeStore;
    uint256 private constant Reward_percentage = 10; //
    uint256 private constant Reward_duration =300 seconds; 
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(address(this),1000);
    }

    function MintTokens(uint256 amount) external {
        _mint(msg.sender, amount);
    }

    function StakeTokens(uint256 amount) external {
        require(amount > 0, "Tokens must be greater than zero");
        require(StakeStore[msg.sender].amount == 0, "You have staked already");

        _transfer(msg.sender, address(this), amount);

        StakeStore[msg.sender] = Stake(amount, block.timestamp);
    }

    function UnstakeTokens(uint256 amount) external {
        require(StakeStore[msg.sender].amount > 0, "Your stakes are Zero");

        require(StakeStore[msg.sender].amount >=amount,"You don't have enough stakes");

        uint256 reward = RewardCalculater(msg.sender,amount);

        uint256 TotalUnstaked_Tokens = amount.add(reward);
        
        require(TotalUnstaked_Tokens <= balanceOf(address(this)), "Insufficient balance in the contract");

        
        if(StakeStore[msg.sender].amount == amount){
            delete StakeStore[msg.sender];
        }
        else{
            StakeStore[msg.sender].amount = StakeStore[msg.sender].amount - amount;
        }
        _transfer(address(this), msg.sender, TotalUnstaked_Tokens);
    }

    function RewardCalculater(address staker,uint256 amount) public view returns (uint256) {
        Stake storage userStake = StakeStore[staker];
        uint256 stakingDuration = block.timestamp.sub(userStake.startTime);
        uint256 reward = amount.mul(stakingDuration).mul(Reward_percentage).div(Reward_duration ).div(100);
        return reward;

    }
    function StakerDetails(address staker) public view returns(Stake memory){
        return StakeStore[staker];
    }
}

