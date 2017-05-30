function getbalance() {
	//var self = this;

     console.log("fetch..");
	var address = document.getElementById("address").value;
     console.log("fetch..",address);
	axios.post('/api/getbalance', {
		address: address
	}).then(function(response) {
        var ress=response.data;
       
        console.log("responsnsnsn",ress.data);
	
	}).catch(function(e) {
        console.log("Error fetching record.",e);
		
	});
}

function unlockaccount() {
	//var self = this;

     console.log("fetch..");
	var address = "0x509277a69779f025a82cc29228a3f2987ef4dbc2";
    var password = "password";
     console.log("fetch..",address);
	axios.post('/api/unlockaccount', {
		address: address,
        password:password
	}).then(function(response) {
        var ress=response.data;
       
        console.log("responsnsnsn",ress.data);
	
	}).catch(function(e) {
        console.log("Error fetching record.",e);
		
	});
}