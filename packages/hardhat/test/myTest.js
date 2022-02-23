const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("My Dapp", function () {
  let myContract;

  describe("YourContract", function () {
    it("Should deploy YourContract", async function () {
      const YourContract = await ethers.getContractFactory("YourContract");

      myContract = await YourContract.deploy();
    });

    describe("sellTokens", function () {
      it("sellTokens success", async () => {
        const ethOfTokenToBuy = ethers.utils.parseEther('1');

        await vendorContract.connect(addr1).buyTokens({
          value: ethOfTokenToBuy,
        });

        const amountToSell = ethers.utils.parseEther('100');
        await tokenContract.connect(addr1).approve(vendorContract.address, amountToSell);

        const allowance = await tokenContract.allowance(addr1.address, vendorContract.address);
        expect(vendorAllowance).to.equal(amountToSell);

        const sellTx = await vendorContract.connect(addr1).sellTokens(amountToSell);

        const vendorTokenBalance = await tokenContract.balanceOf(vendorContract.address); 
        expect(vendorTokenBalance).to.equal(ethers.utils.parseEther('1000'));

        const userTokenBalance = await tokenContract.balanceOf(addr1.address);
        expect(userTokenBalance).to.equal(0);

        const userEthBalance = ethers.utils.parseEther('1');
        await expect(sellTx).to.changeEtherBalance(addr1, userEthBalance);
      });
    });
  });
});
