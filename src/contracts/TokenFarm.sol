pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm is Ownable {
    string public name = "Token Farm";
    DaiToken public daiToken;
    DappToken public dappToken;
    
    struct Stock {
        string stockName;
        string imageUrl;
        uint seed;
        string bio;
        uint currPoints;
        string dividends;
        uint float;
        string market;
    }

    Stock[] public stocks;
    uint public stockCount;
    mapping(string => uint) public stockNames;

    mapping(address => string[]) public stakeNames;
    mapping(address => uint) public numStakes;
    mapping(address => mapping(string => uint)) public stakes;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;

    bool public testBool = false;

    constructor(DappToken _dappToken, DaiToken _daiToken) public {
        dappToken = _dappToken;
        daiToken = _daiToken;
    }

    function createStock(
        string memory stockName,
        string memory imageUrl,
        uint seed,
        string memory bio,
        uint currPoints,
        string memory dividends,
        uint float,
        string memory market
        ) 
        public 
        onlyOwner
        returns (uint)
        {
        stocks.push(Stock(stockName, imageUrl, seed, bio, currPoints, dividends, float, market));
        stockNames[stockName]++;
        stockCount++;
        return stockCount;
    }

    function stakeTokens(uint _amount, string memory stockName) public {
        require(_amount > 0, "amount cannot be 0");
        require(stockNames[stockName] != 0);

        
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        hasStaked[msg.sender] = true;

        if (stakes[msg.sender][stockName] == 0) {
            uint x = numStakes[msg.sender];
            if (x == (stakeNames[msg.sender]).length) {
                stakeNames[msg.sender].push(stockName);
            }
            else {
                stakeNames[msg.sender][x] = stockName;
            }
            numStakes[msg.sender]++;
        }
        stakes[msg.sender][stockName] += _amount;

        daiToken.transferFrom(msg.sender, address(this), _amount);
    }

    // Unstaking Tokens (Withdraw)
    function unstakeTokens(uint _amount, string memory stockName) public {
        // Fetch staking balance
        uint balance = stakingBalance[msg.sender];
        uint stockBalance = stakes[msg.sender][stockName];
        require(balance > 0, "staking balance cannot be 0");
        require(stockBalance > 0, "staking balance cannot be 0");
        require(_amount <= stockBalance, "amount is more than balance");
        
        stakingBalance[msg.sender] -= _amount;
        stakes[msg.sender][stockName] -= _amount;
        
        if (stakes[msg.sender][stockName] == 0) {
            uint stakeNum = numStakes[msg.sender];
            for (uint i = 0; i < stakeNum; i++) {
                if (keccak256(abi.encodePacked(stockName)) == keccak256(abi.encodePacked(stakeNames[msg.sender][i]))) {
                    testBool = true;
                    stakeNames[msg.sender][i] = stakeNames[msg.sender][stakeNum - 1];
                    delete stakeNames[msg.sender][stakeNum - 1];
                    numStakes[msg.sender]--;
                    i = stakeNum;
                    break;
                }
            }
        }
        daiToken.transfer(msg.sender, _amount);
    }

    // Issuing Tokens
    function issueTokens() public onlyOwner {
        // Issue tokens to all stakers
        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if(balance > 0) {
                dappToken.transfer(recipient, balance);
            }
        }
    }
}
