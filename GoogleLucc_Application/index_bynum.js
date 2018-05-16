var http = require('http');
var url = require('url');
var util = require('util');
var gju = require('./geojson-utils');

var points = [
	{"x":"10901912.705887001","y":"4945153.846824","class":"a"},
	{"x":"9061545.705887001","y":"3557802.846824","class":"b"},
	{"x":"11645537.705887001","y":"2764085.846824","class":"c"},
	{"x":"11112765.705887001","y":"3574345.846824","class":"d"},
	{"x":"11965252.705887001","y":"3074993.846824","class":"e"},
	{"x":"13611633.705887001","y":"6162601.846824","class":"f"},
	{"x":"13906996.705887001","y":"6526276.846824","class":"g"},
	{"x":"10319963.705887001","y":"4730603.846824","class":"h"},
	{"x":"11871605.705887001","y":"3970693.846824","class":"i"}
];
http.createServer(function(req, res){

    res.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin' : '*'});
    var params = url.parse(req.url, true).query;
	var id = params.id;
	if(id < 0)
		id = 0;
	if(id >= points.length)
		id = points.length - 1;
	res.write("" + points[id]['x'] + "," + points[id]['y']);
    res.end();
 
}).listen(3001);