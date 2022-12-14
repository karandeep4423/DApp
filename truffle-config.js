const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  development: {
    host: "localhost",
    port: 7545,
    network_id: "*", // Match any network id
    gas: 5000000
  },
  };

