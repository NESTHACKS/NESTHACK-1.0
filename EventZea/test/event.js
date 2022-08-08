const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const { waffle } = require("hardhat");

describe("Event Pool", function () {
  let eventFactory, event, busd;

  beforeEach(async function () {
    const [owner, user1, user2, user3] = await ethers.getSigners();
    eventFactory = await ethers.getContractFactory("EventPool");

    //Busd Token
    const Busd = await ethers.getContractFactory("BUSD");
    busd = await Busd.deploy();
    await busd.deployed();

    event = await eventFactory.deploy(busd.address);
    await event.unpause();
    const dateInSecs1 = Math.floor(new Date("2022-08-12").getTime() / 1000);
    const dateInSecs2 = Math.floor(new Date("2022-10-10").getTime() / 1000);

    const event1 = await event
      .connect(user2)
      .createEvent(
        "GDG Fest Event",
        dateInSecs1,
        dateInSecs1,
        ethers.utils.parseEther("10"),
        100,
        "Tech",
        "none",
        "lagos"
      );

    const event2 = await event.createEvent(
      "Party",
      dateInSecs2,
      dateInSecs2,
      ethers.utils.parseEther("10"),
      100,
      "Social",
      "none",
      "lagos"
    );
  });

  it("Should have correct event name", async function () {
    const firstEvent = await event.callStatic.getEvent(0);
    const expectedValue = "GDG Fest Event";
    // assert
    // expect
    assert.equal(firstEvent.name.toString(), expectedValue);
    expect(firstEvent.name.toString()).to.equal(expectedValue);
  });

  it("Should have correct event price", async function () {
    const firstEvent = await event.callStatic.getEvent(0);
    const expectedValue = "10000000000000000000";
    // assert
    // expect
    assert.equal(firstEvent.price.toString(), expectedValue);
    //expect(firstEvent.name.toString()).to.equal(expectedValue);
  });

  it("Should have correct ticket count", async function () {
    const firstEvent = await event.callStatic.getEvent(0);
    const expectedValue = "100";
    // assert
    // expect
    assert.equal(firstEvent.ticketCount.toString(), expectedValue);
    //expect(firstEvent.name.toString()).to.equal(expectedValue);
  });

  it("Should be able to buy ticket", async function () {
    const [owner, user1, user2, user3] = await ethers.getSigners();
    busd.transfer(user1.address, ethers.utils.parseEther("100"));
    await busd
      .connect(user1)
      .approve(event.address, ethers.utils.parseEther("100"));
    const buy1 = await event.connect(user1).callStatic.buyTicket(0);
    const expectedValue = true;
    // assert
    // expect
    assert.equal(buy1, expectedValue);
    //expect(firstEvent.name.toString()).to.equal(expectedValue);
  });

  it("Should be able to buy ticket and reduce ticket count", async function () {
    const [owner, user1, user2, user3] = await ethers.getSigners();
    busd.transfer(user1.address, ethers.utils.parseEther("100"));
    await busd
      .connect(user1)
      .approve(event.address, ethers.utils.parseEther("100"));
    await event.connect(user1).buyTicket(0);
    const firstEvent = await event.getEvent(0);

    const expectedValue = "99";
    // assert
    // expect
    assert.equal(firstEvent.ticketRemaining.toString(), expectedValue);
    //expect(firstEvent.name.toString()).to.equal(expectedValue);
  });

  // it("Should send token to admin", async function () {
  //   const [owner, user1, user2, user3] = await ethers.getSigners();
  //   busd.transfer(user1.address, ethers.utils.parseEther("100"));
  //   await busd
  //     .connect(user1)
  //     .approve(event.address, ethers.utils.parseEther("100"));
  //   await event.connect(user1).buyTicket(0);

  //   const adminbalance = await busd.balanceOf(user2.address);
  //   const expectedValue = "9000000000000000000";

  //   // assert
  //   // expect
  //   assert.equal(adminbalance.toString(), expectedValue);
  //   //expect(firstEvent.name.toString()).to.equal(expectedValue);
  // });

  /* it("Should send token to contract", async function () {
    const [owner, user1, user2, user3] = await ethers.getSigners();
    busd.transfer(user1.address, ethers.utils.parseEther("100"));
    await busd
      .connect(user1)
      .approve(event.address, ethers.utils.parseEther("100"));
    await event.connect(user1).buyTicket(0);

    const contractBalance = await busd.balanceOf(event.address);
    const value = "1000000000000000000";
    // assert
    // expect
    assert.equal(contractBalance.toString(), value);
    //expect(firstEvent.name.toString()).to.equal(expectedValue);
  }); */

  it("Should be able to list ticket", async function () {
    const [owner, user1, user2, user3] = await ethers.getSigners();
    busd.transfer(user1.address, ethers.utils.parseEther("100"));
    await busd
      .connect(user1)
      .approve(event.address, ethers.utils.parseEther("100"));
    await event.connect(user1).buyTicket(0);
    await event.connect(user1).listTicket(0, ethers.utils.parseEther("20"));
    const firstEvent = await event.fetchAllResell();

    const expectedValue = "0";
    // assert
    // expect
    assert.equal(firstEvent[0].resellId.toString(), expectedValue);
    //expect(firstEvent.name.toString()).to.equal(expectedValue);
  });

  it("Should be able to buy listed ticket", async function () {
    const [owner, user1, user2, user3] = await ethers.getSigners();
    busd.transfer(user1.address, ethers.utils.parseEther("100"));
    busd.transfer(user3.address, ethers.utils.parseEther("100"));
    await busd
      .connect(user1)
      .approve(event.address, ethers.utils.parseEther("100"));
    await busd
      .connect(user3)
      .approve(event.address, ethers.utils.parseEther("100"));
    await event.connect(user1).buyTicket(0);
    await event.connect(user1).listTicket(0, ethers.utils.parseEther("20"));
    //await event.connect(user3).sellTicket(0, 0, user1.address);

    const firstEvent = await event.connect(user3).hasTicket(0, user3.address);
    const firstEvent2 = await event.connect(user1).hasTicket(0, user1.address);
    //const firstEvent3 = await event.connect(user1).fetchMyResellEvent();
    //const firstEvent4 = await event.connect(user1).fetchAllFlipped();

    console.log(firstEvent);
    console.log(firstEvent2);
    //console.log(firstEvent3);
    //console.log(firstEvent4);

    //const expectedValue = "0";
    // assert
    // expect
    //assert.equal(firstEvent[0].resellId.toString(), expectedValue);
    //expect(firstEvent.name.toString()).to.equal(expectedValue);
  });
});
