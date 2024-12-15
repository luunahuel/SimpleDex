// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SimpleDEX {
    IERC20 public tokenA;
    IERC20 public tokenB;

    uint256 public reserveA;
    uint256 public reserveB;

    address public owner;

    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "No autorizado");
        _;
    }

    // liquidez
    function addLiquidity(uint256 amountA, uint256 amountB) public onlyOwner {
        require(tokenA.transferFrom(msg.sender, address(this), amountA), "Error, no se pudo transferir  TokenA");
        require(tokenB.transferFrom(msg.sender, address(this), amountB), "Error , no se puede transferir TokenB");
        reserveA += amountA;
        reserveB += amountB;
    }

    // Intercambio
    function swapAforB(uint256 amountAIn) public {
        uint256 amountBOut = getSwapAmount(amountAIn, reserveA, reserveB);
        require(tokenA.transferFrom(msg.sender, address(this), amountAIn), "Error, no se pudo transferir TokenA");
        require(tokenB.transfer(msg.sender, amountBOut), "Error, no se pudo transferir TokenB");

        reserveA += amountAIn;
        reserveB -= amountBOut;
    }

    // Intercambiar B POR A
    function swapBforA(uint256 amountBIn) public {
        uint256 amountAOut = getSwapAmount(amountBIn, reserveB, reserveA);
        require(tokenB.transferFrom(msg.sender, address(this), amountBIn), "Error ,no se pudo transferir TokenB");
        require(tokenA.transfer(msg.sender, amountAOut), "Error, no se pudo transferir TokenA");

        reserveB += amountBIn;
        reserveA -= amountAOut;
    }

    // Retirar 
    function removeLiquidity(uint256 amountA, uint256 amountB) public onlyOwner {
        require(reserveA >= amountA && reserveB >= amountB, "No hay suficiente liquidez");
        require(tokenA.transfer(msg.sender, amountA), "Error, no se pudo retirr TokenA");
        require(tokenB.transfer(msg.sender, amountB), "Error, no se pudo retirar TokenB");

        reserveA -= amountA;
        reserveB -= amountB;
    }

    // Obtener los precios
    function getPrice(address _token) public view returns (uint256) {
        if (_token == address(tokenA)) {
            return reserveB / reserveA; // Precio de TokenA 
        } else if (_token == address(tokenB)) {
            return reserveA / reserveB; // Precio de TokenB 
        }
        revert("Token no valido");
    }

    // Calcular el valor de intercambio 
    function getSwapAmount(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) internal pure returns (uint256) {
        uint256 amountInWithFee = amountIn * 997; // 0.3% de tarifa
        uint256 numerator = amountInWithFee * reserveOut;
        uint256 denominator = reserveIn * 1000 + amountInWithFee;
        return numerator / denominator;
    }
}