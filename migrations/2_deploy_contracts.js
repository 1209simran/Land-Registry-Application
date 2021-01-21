// eslint-disable-next-line no-undef
const LandRegistry = artifacts.require('LandRegistry')

module.exports = function (deployer) {
  deployer.deploy(LandRegistry)
}
