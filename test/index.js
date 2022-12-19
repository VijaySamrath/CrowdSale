const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('Crowdsale', () => {
    beforeEach(async () => {
        [owner, signer2, signer3] = await ethers.getSigners();
        const CrowdCoin = await hre.ethers.getContractFactory("CrowdCoin");
        crowdCoin = await CrowdCoin.deploy();
      
        await crowdCoin.deployed();
      
        console.log(
          "CrowdCoin deployed to:" , crowdCoin.address
        );
      
        const CrowdSale = await hre.ethers.getContractFactory("CrowdSale");
        crowdSale = await CrowdSale.deploy(2, owner.address, crowdCoin.address);
      
        await crowdSale.deployed();
      
        console.log("CrowdSale deployed to:", crowdSale.address);

    });

    describe('buyTokens', () => {
        it('adds a token Symbol', async () => {
            let totalSupply;
            let signer2Balance;
            let signer3Balance;

            totalSupply = await crowdCoin.totalSupply()
            signer2Balance = await crowdCoin.balanceOf(signer2.address)
            signer3Balance = await crowdCoin.balanceOf(signer3.address)
            // expect(totalSupply).to.be.equal(0)
            expect(signer2Balance).to.be.equal(0)
            expect(signer3Balance).to.be.equal(0)

            await crowdCoin.connect(owner).mint(
                crowdSale.address,
                ethers.utils.parseEther('10000')
            )

            const ownerEtherBalanceOld = await owner.getBalance()

            await crowdSale.connect(signer2).buyTokens(signer2.address, {value: ethers.utils.parseEther('10')})
            await crowdSale.connect(signer3).buyTokens(signer3.address, {value: ethers.utils.parseEther('20')})

            totalSupply = await crowdCoin.totalSupply()
            signer2Balance = await crowdCoin.connect(owner).balanceOf(signer2.address)
            signer3Balance = await crowdCoin.connect(owner).balanceOf(signer3.address)

            const ownerEtherBalanceNew = await owner.getBalance()

            // expect(totalSupply).to.be.equal(ethers.utils.parseEther('10000'))
            expect(signer2Balance).to.be.equal(ethers.utils.parseEther('20'))
            expect(signer3Balance).to.be.equal(ethers.utils.parseEther('40'))
            expect(ownerEtherBalanceNew).to.be.above(ownerEtherBalanceOld)

            console.log("total Amount in Wallet", await crowdSale.weiRaised());













































































            






 
        })
    })
})