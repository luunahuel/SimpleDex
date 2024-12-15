let provider;
let signer;
let simpleDex;

async function initializeProvider() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        await ethereum.request({ method: 'eth_requestAccounts' });
      
        simpleDex = new ethers.Contract(simpleDexAddress, simpleDexABI, signer);
        await checkNetwork();
        console.log("Proveedor y contrato inicializados correctamente.");
    } else {
        alert('Por favor instala MetaMask');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    // Inicialización de simpleDex y otras configuraciones necesarias
    document.getElementById('tokenPrice').addEventListener('change', getPriceFromSelection);
}
 
const tokenAAddress = '0x8A34d2d75A5481f233F505515335EC0AdF2241b4';
const tokenBAddress = '0x220B4032cAb9479B7b02AC87c212b660FA6408D6';
const simpleDexAddress = '0x2dd7DC8DEc3a2bFe8e9CB4aE1aF7A0Ee75d32A40';


const simpleDexABI = [ 
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_tokenA",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_tokenB",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "provider",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountA",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountB",
                "type": "uint256"
            }
        ],
        "name": "LiquidityAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "provider",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountA",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountB",
                "type": "uint256"
            }
        ],
        "name": "LiquidityRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "swapper",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "fromToken",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "toToken",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "inputAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "outputAmount",
                "type": "uint256"
            }
        ],
        "name": "TokensSwapped",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountA",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountB",
                "type": "uint256"
            }
        ],
        "name": "addLiquidity",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_token",
                "type": "address"
            }
        ],
        "name": "getPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountA",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amountB",
                "type": "uint256"
            }
        ],
        "name": "removeLiquidity",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "reserveA",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "reserveB",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountAIn",
                "type": "uint256"
            }
        ],
        "name": "swapAforB",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amountBIn",
                "type": "uint256"
            }
        ],
        "name": "swapBforA",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tokenA",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tokenB",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
 ];
const tokenAABI = [ 
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "allowance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];  
const tokenBABI = [ 
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "allowance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
 ]; 

 async function initializeContract() {
    const { signer } = await initializeProviderAndSigner();
    if (signer) {
        // Crea la instancia del contrato con el signer
        const simpleDex = new ethers.Contract(simpleDexAddress, simpleDexABI, signer);
        return simpleDex;
    }
    return null;
}

// Función para conectar la billetera y mostrar la información
async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const chainId = await ethereum.request({ method: 'eth_chainId' });
            const balance = await ethereum.request({
                method: 'eth_getBalance',
                params: [accounts[0], 'latest']
            });

            const formattedBalance = ethers.utils.formatEther(balance);
            walletAddress.textContent = accounts[0];
            ethBalance.textContent = `${formattedBalance} ETH`;

            let network = "";
            if (chainId === "0xaa36a7") {
                network = "Sepolia";
            } else if (chainId === "0x534350") {
                network = "Scroll Sepolia";
            } else {
                network = "Otra red";
            }

            networkName.textContent = network;

            statusText.textContent = 'Conectado';
            walletInfo.classList.remove('hidden');
            btnConnect.classList.add('hidden');
            btnDisconnect.classList.remove('hidden');

            await updateGasInfo();

        } catch (error) {
            console.error(error);
        }
    } else {
        alert('MetaMask no está instalado!');
        throw new Error("MetaMask no está disponible.");
    }
}

// Función para desconectar la billetera
function disconnectWallet() {
    walletInfo.classList.add('hidden');
    statusText.textContent = 'hidden';
    btnConnect.classList.remove('hidden');
    btnDisconnect.classList.add('hidden');
}

// Función para verificar la red
async function checkNetwork() {
    const network = await provider.getNetwork();
    if (network.name !== "sepolia" && network.name !== "scrollsepolia") {
        alert("Por favor, conecta a la red correcta.");
    }
}

// Función para obtener y mostrar el gas disponible
async function updateGasInfo() {
    try {
        if (!provider) {
            throw new Error("El proveedor no está inicializado.");
        }

        const gasPrice = await provider.getGasPrice();
        const formattedGasPrice = ethers.utils.formatUnits(gasPrice, "gwei");
        gasAmount.textContent = `${formattedGasPrice} Gwei`;
    } catch (error) {
        console.error("Error al obtener el precio del gas:", error);
        gasAmount.textContent = "No disponible";
    }
}

const simpleDexContract = new ethers.Contract(
    simpleDexAddress,
    simpleDexABI, 
    signer 
);

// Función para agregar liquidez
async function addLiquidity() {
    const tokenAAmount = document.getElementById('addLiquidityTokenA').value;
    const tokenBAmount = document.getElementById('addLiquidityTokenB').value;

    const tokenA = new ethers.Contract(tokenAAddress, tokenAABI, signer);
    const tokenB = new ethers.Contract(tokenBAddress, tokenBABI, signer);

    await tokenA.approve(simpleDexAddress, tokenAAmount);
    await tokenB.approve(simpleDexAddress, tokenBAmount);

    const tx = await simpleDex.addLiquidity(tokenAAmount, tokenBAmount);
    await tx.wait();
    console.log("Liquidez agregada exitosamente");
}

// Función para retirar liquidez
async function removeLiquidity() {
   
    const amountToRemove = ethers.utils.parseUnits("0.000000000000000001", 18); 

    try {
        
        const tx = await simpleDex.removeLiquidity(amountToRemove);
        console.log("Transacción enviada:", tx);
        await tx.wait(); 
        console.log("Liquidez retirada con éxito");
    } catch (error) {
        console.error("Error al retirar liquidez:", error);
    }
}

async function checkMinLiquidity() {
    // Aquí consulta el contrato de liquidez de SimpleDEX
    const liquidityA = await tokenA.balanceOf(simpleDexAddress);  
    const liquidityB = await tokenB.balanceOf(simpleDexAddress);  

    const minLiquidity = ethers.utils.parseUnits("0.01", 18); 

    console.log("Liquidez mínima posible para retirar: ", ethers.utils.formatUnits(minLiquidity, 18));
    console.log("Liquidez disponible TokenA: ", ethers.utils.formatUnits(liquidityA, 18));
    console.log("Liquidez disponible TokenB: ", ethers.utils.formatUnits(liquidityB, 18));

    // Compara y ajusta el monto de retiro para que no sea inferior al mínimo
    if (liquidityA.lt(minLiquidity) || liquidityB.lt(minLiquidity)) {
        alert("No hay suficiente liquidez para retirar este monto.");
    }
}


// Función para intercambiar tokens
async function swapTokens() {
    const amountToSwap = ethers.utils.parseUnits("0.01", 18); 
    const signerWithSimpleDex = simpleDex.connect(signer);

    // Determinar si el usuario desea hacer swapAforB o swapBforA
    const selectedDirection = document.getElementById('tokenToSwap').value; 
    const amountA = document.getElementById('swapTokenA').value;
    const amountB = document.getElementById('swapTokenB').value;
    
    let allowanceToken, swapFunction;

    if (selectedDirection === "AtoB") {
        amountToSwap = ethers.utils.parseUnits(amountA || "0", 18); // Usar Token A
        allowanceToken = tokenA;
        swapFunction = signerWithSimpleDex.swapAforB;
    } else if (selectedDirection === "BtoA") {
        amountToSwap = ethers.utils.parseUnits(amountB || "0", 18); // Usar Token B
        allowanceToken = tokenB;
        swapFunction = signerWithSimpleDex.swapBforA;
    } else {
        console.error("Selección de intercambio inválida");
        return;
    }

    try {
        // Verificar allowance para el token seleccionado
        const allowance = await allowanceToken.allowance(await signer.getAddress(), simpleDexAddress);
        if (allowance.lt(amountToSwap)) {
            await allowanceToken.approve(simpleDexAddress, amountToSwap);
            console.log(`${selectedDirection === "AtoB" ? "Token A" : "Token B"} aprobado para el intercambio`);
        }

        // Realizar el intercambio
        const tx = await swapFunction(amountToSwap);
        console.log("Intercambio enviado:", tx);
        await tx.wait();

        console.log(`Intercambio ${selectedDirection === "AtoB" ? "Token A -> Token B" : "Token B -> Token A"} realizado con éxito`);
    } catch (error) {
        console.error("Error al hacer swap:", error);
    }
}

// Función para obtener el precio desde la selección en el dropdown
async function getPriceFromSelection() {
    const selectedToken = document.getElementById('tokenPrice').value; 
    console.log("Token seleccionado:", selectedToken);
    await getPrice(selectedToken); // Llamamos a getPrice con el address del token
}
document.getElementById('tokenPrice').addEventListener('change', getPriceFromSelection);

// Función para obtener el precio de un token en términos del otro
async function getPrice(tokenAddress) {
    try {
        if (!simpleDex) {
            console.error("Contrato no inicializado.");
            return;
        }

        // Llamar a getPrice directamente con el address del token
        const price = await simpleDex.methods.getPrice(tokenAddress).call(); // Suponiendo que el método es un 'call' de web3.js
        const formattedPrice = ethers.utils.formatUnits(price, 18); // Formateamos el precio según los decimales del token (18 en este caso)

        // Mostrar el precio en el frontend
        document.getElementById("priceResult").innerHTML = `Precio: ${formattedPrice}`;
        console.log("Precio obtenido:", formattedPrice);
    } catch (error) {
        console.error("Error al obtener el precio:", error);
        document.getElementById("priceResult").innerHTML = "Error al obtener el precio";
    }
}

// Función para actualizar la información de la billetera
async function updateWalletInfo() {
    const address = await signer.getAddress();
    const network = await provider.getNetwork();
    const ethBalance = await provider.getBalance(address);
    const gasPrice = await provider.getGasPrice(address);

    document.getElementById('wallet-address').textContent = address;
    document.getElementById('eth-balance').textContent = ethers.utils.formatEther(ethBalance);
    document.getElementById('gas-amount').textContent = ethers.utils.formatEther(gasPrice, "gwei");
    document.getElementById('network-name').textContent = network.name;
}

// Conectar a la billetera cuando el usuario presiona el botón
    document.getElementById('btnConnect').addEventListener('click', async () => {
    await initializeProvider();
    await updateWalletInfo();
    document.getElementById('btnConnect').classList.add('hidden');
    document.getElementById('btnDisconnect').classList.remove('hidden');
    document.getElementById('wallet-info').classList.remove('hidden');
});

// Desconectar de MetaMask
    document.getElementById('btnDisconnect').addEventListener('click', () => {
    document.getElementById('btnConnect').classList.remove('hidden');
    document.getElementById('btnDisconnect').classList.add('hidden');
    document.getElementById('wallet-info').classList.add('hidden');
});

// Funciones para interactuar con el contrato
document.getElementById('btnAddLiquidity').addEventListener('click', addLiquidity);
document.getElementById('btnRemoveLiquidity').addEventListener('click', removeLiquidity);
document.getElementById('btnSwap').addEventListener('click', swapTokens);
document.getElementById('btnGetPrice').addEventListener('click', getPriceFromSelection);
