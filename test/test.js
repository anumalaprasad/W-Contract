const {expect} = require('chai');
const { ethers } = require('hardhat');

describe('Witlab', () => {
    let Witlab, owner, addr1, addr2;   
    
    beforeEach(async ()=>{
        Witlab = await ethers.getContractFactory("Witlab");
        witlab = await Witlab.deploy();

        [owner, addr1, addr2, _] = await ethers.getSigners();
        // console.log(addr2.address);

    });

    describe( ' Deployment' ,() => {
        it( 'Should set the right owner', async ( ) => {
            expect (await witlab.owner()).to.equal(owner.address) ;
        });
        
    });

    describe( 'Minting' ,() => {
        
        it( 'Should not mint for value other than 0.001 ether', async () => {  
                await expect(witlab.connect(addr1).mintUsingEth( {value: 1000000000000  })).to
                .be.revertedWith("Minting fee is exactly 0.001 ether");
                 
        }); 

        it( 'Should mint soulbound token only once', async () => { 
            await witlab.connect(addr1).mintUsingEth( {value: 1000000000000000 }) ; 
            await expect(witlab.connect(addr1).mintUsingEth( {value: 1000000000000000 })).to
            .be.revertedWith("Only one minting allowed per address");
            
        });

        it( 'Should not be able to transfer', async () => { 
            await witlab.connect(addr1).mintUsingEth( {value: 1000000000000000 }) ; 
            
            const tokenId = await witlab.getTokenID();
            // console.log(tokenId);
            await expect(witlab.connect(addr1).transferSBT( addr2.address, tokenId - 1 )).to.be.revertedWith("Err: token transfer is BLOCKED") ; 
        });
        
        it( 'tokenURI should be same as address', async () => { 
            await witlab.connect(addr1).mintUsingEth( {value: 1000000000000000 }) ; 
            
            const tokenId = await witlab.getTokenID();
            console.log(addr1.address );
            
            const tokenURI = await witlab.connect(addr1).tokenURI( tokenId - 1 );
            console.log(tokenURI.toString());
            expect(addr1.address).to.equal("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
            // expect("hi").to.equal("hi");
            // console.log(tokenId);
            // await expect(witlab.connect(addr1).tokenURI( tokenId - 1 )).to.equal(addr1.address.toString()) ; 
        }); 
    });


});

 