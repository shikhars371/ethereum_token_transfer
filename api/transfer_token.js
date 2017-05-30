var address = require('../address.js');
var contract = require('truffle-contract');
var record_artifacts = require('../build/contracts/FixedSupplyToken.json');
var axios = require('axios');

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
	transfer: function(req, res, next) {
		start();

        var self = this;
		var accountfrom = req.body.addressFrom;
		var password = req.body.password;
        var account_To=req.body.addressTO;
        var value=req.body.value;
		web3.personal.unlockAccount(accountfrom, password,function(error,result){
			if(!error){
				console.log(result);
				//res.send({public: account,status:"UNLOCKED"});


            var record;
            Record.deployed().then(function (instance) {
			record = instance;
           
			record.transfer(account_To, value, {from: web3.eth.coinbase}).then(function(){
			
            console.log("transferring");
				res.json({ message: "Success", account_To: account_To, value: value});
			})

		.catch(function (e) {
              console.log("transferring Failure",e);
			res.json({ message: "Failure", Error: e, errorMessage: errorMessage })
		});
	}).catch(function (e) {
              console.log("transferring Failure",e);
			res.json({ message: "Failure", Error: e, errorMessage: errorMessage })
		}); 
            }
        
        else {
				console.log("ERROR NEW acc", error)
			}
		});

	},
}
