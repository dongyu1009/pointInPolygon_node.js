var http = require('http');
var url = require('url');
var util = require('util');
var gju = require('./geojson-utils');

// the boundry of study area
var boundryPolygon = {"type":"Polygon", "coordinates":[[[0,0],[6,0],[6,6],[0,6]]]};

http.createServer(function(req, res){

    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin' : '*'});
    var params = url.parse(req.url, true).query;
	var x = params.x;
	var y = params.y;
	var inPolygon = gju.pointInPolygon({"type":"Point","coordinates":[x,y]}, boundryPolygon);
	if (inPolygon)
	{
		res.write("" + x + " " + y);
	}else {
		res.write("no");
	}
    res.end();
 
}).listen(3000);