var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin' : '*'});
    var params = url.parse(req.url, true).query;
	if (params.name > 200){
		res.write('yes');
	} else {
		res.write('no');
	}
    res.end();
 
}).listen(3000);