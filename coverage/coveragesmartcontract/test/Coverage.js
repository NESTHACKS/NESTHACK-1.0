// const { ethers } = require( "hardhat" );
const { expect } = require( "chai" );
const { utils, BigNumber } = require( 'ethers' );
const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");


let balanceBefore;
let balanceAfter;
let result;
let userDetails = "James";
let pensionPlanDetails = "Flexible";
const amount = ethers.utils.parseUnits("20", 6)

const USDC_ABI_KOVAN = [{"inputs":[{"internalType":"uint256","name":"_initialAmount","type":"uint256"},{"internalType":"string","name":"_tokenName","type":"string"},{"internalType":"uint8","name":"_decimalUnits","type":"uint8"},{"internalType":"string","name":"_tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":false,"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"allocateTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
const USDC_ADDRESS_KOVAN = "0xb7a4F3E9097C08dA09517b5aB877F7a917224ede";
// const USDC_TOKEN_KOVAN = new ethers.Contract( USDC_ADDRESS_KOVAN, USDC_ABI_KOVAN, ethers.getDefaultProvider( 'kovan' ) );
const cUSDC = "0x4a92e71227d294f041bd82dd8f78591b75140d63";



describe( "Coverage Smart Contract ========>>>>>>>>>>>>>>>>>>>>>>>>", () =>
{
  async function deployCoverageFixture() {
    const Coverage = await ethers.getContractFactory("Coverage");
   let [ owner, f_account] = await ethers.getSigners();

    const Coveragedeploy = await Coverage.deploy(cUSDC);

    await Coveragedeploy.deployed();

 console.log( "CoverageContract deployed to:", Coveragedeploy.address );
    // Fixtures can return anything you consider useful for your tests
    return { f_account, owner, Coveragedeploy };
  }
    
    it("Should deploy the contract correctly ", async () => {
      const { Coveragedeploy } = await loadFixture(deployCoverageFixture);
      expect(Coveragedeploy.address).to.exist;
    } );
    it("Should set the right owner", async function () {
      const { Coveragedeploy, owner } = await loadFixture(deployCoverageFixture);

      expect(await Coveragedeploy.admin()).to.equal(owner.address);
    });

    it( "Should Register User and Emit Register Event", async () =>
    {
        const { Coveragedeploy, owner } = await loadFixture( deployCoverageFixture );
        await expect( Coveragedeploy.connect(owner)._onBoarding( userDetails ) ).to.emit( Coveragedeploy, "RegisterClient" );
        
    } );
    // it( "Should Deposit Assert into the Contract if User is not Registered", async () =>
    // {
    //     const { Coveragedeploy, owner} = await loadFixture(deployCoverageFixture);
    //     await expect(Coveragedeploy.connect(owner).depositAssert(USDC_ADDRESS_KOVAN,amount) ).to.emit(Coveragedeploy, "Deposit" );
        
    // } );

});