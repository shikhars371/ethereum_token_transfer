var address = require('../address.js');
var contract = require('truffle-contract');
var record_artifacts = require('../build/contracts/FixedSupplyToken.json');

var Record = contract(record_artifacts);

var accounts;
var account;

var errorMessage = "";
function start() {
	var self = this;
	Record.setProvider(web3.currentProvider);
	web3.eth.getAccounts(function(err, accs) {
		if (err != null) {
			errorMessage = "There was an error fetching your accounts.";
			return;
		}
		if (accs.length == 0) {
			errorMessage = "Couldn't get any accounts! Make sure your Ethereum client is configured correctly.";
			return;
		}
		accounts = accs;
		account = accounts[0];
	});
}
module.exports = {
	balance: function(req, res, next) {
		start();
		
		var address = req.body.address;
		var record;
		Record.deployed().then(function(instance) {
			record = instance;
			console.log("address",address);
			return record.balanceOf.call(address, {from: account});
		}).then(function(response) {
				console.log("success",response);
			res.json({message: "Success",Token:response})
		}).catch(function(e) {
				console.log("failure",e);
			res.json({message: "Failure", Error: e, errorMessage: errorMessage})
		});
	},
}
