/** @type import('hardhat/config').HardhatUserConfig */
require('@nomiclabs/hardhat-waffle');


module.exports = {
  solidity: "0.8.17",
  
  paths: {
    artifacts: "./frontend/src/artifacts",
  },
  
  networks: {
      hardhat:{
        chainId:1337,
      },
  } 
};
