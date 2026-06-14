const Tickets = artifacts.require("Tickets");

module.exports = async function (deployer, network, accounts) {

  // 👇 USER 2 = verifier
  const verifier = accounts[1];

  await deployer.deploy(Tickets, verifier);
};