const Venues = artifacts.require("Venues");

module.exports = function (deployer) {
  deployer.deploy(Venues);
};