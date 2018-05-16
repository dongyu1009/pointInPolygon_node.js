var http = require('http');
var url = require('url');
var util = require('util');
var gju = require('./geojson-utils');
var data = require('./county_buffer.json');

var get_client_ip = function(req) {
        var ip = req.headers['x-forwarded-for'] ||
                    req.ip ||
                            req.connection.remoteAddress ||
                                    req.socket.remoteAddress ||
                                            req.connection.socket.remoteAddress || '';
            if(ip.split(',').length>0){
                        ip = ip.split(',')[0]
                                }
                return ip;
};

const log4js = require('log4js');
log4js.configure({
      appenders: { inpolygon: { type: 'file', filename: 'inpolygon.log' } },
      categories: { default: { appenders: ['inpolygon'], level: 'trace' } }
});

const logger = log4js.getLogger('inpolygon');

   
http.createServer(function(req, res){

    // no twice get 
    if (url.parse(req.url).path == '/favicon.ico')
        return;
    var client_ip = get_client_ip(req);
    // console.log(client_ip);

    res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8', 'Access-Control-Allow-Origin' : '*'});
    var params = url.parse(req.url, true).query;
	var x = params.x;
	var y = params.y;
	var wid = params.wid;
    var inputdesc = " x:" + x + " y:" + y + " wid:" + wid + "; request IP:" + client_ip;
    if(x == undefined)
    {
        res.write(JSON.stringify({"result": "error", "desc": "Lack of x parameter."}));
        logger.info("errorcode : 1, " + inputdesc);
        res.end();
        return;
    }
    if(y == undefined)
    {
        res.write(JSON.stringify({"result": "error", "desc": "Lack of y parameter."}));
        logger.info("errorcode : 2, " + inputdesc);
        res.end();
        return;
    }
    if(wid == undefined)
    {
        res.write(JSON.stringify({"result": "error", "desc": "Lack of wid parameter."}));
        logger.info("errorcode : 3, " + inputdesc);
        res.end();
        return;
    }
    if(isNaN(wid))
    {
        res.write(JSON.stringify({"result": "error", "desc": "wid parameter is not valid."}));
        logger.info("errorcode : 4, " + inputdesc);
        res.end();
        return;
    }
    if(isNaN(x))
    {
        res.write(JSON.stringify({"result": "error", "desc": "x parameter is not valid."}));
        logger.info("errorcode : 5, " + inputdesc);
        res.end();
        return;
    }
    if(isNaN(y))
    {
        res.write(JSON.stringify({"result": "error", "desc": "y parameter is not valid."}));
        logger.info("errorcode : 6, " + inputdesc);
        res.end();
        return;
    }
    wid = parseInt(wid);
    
    var features = data.features;
    var ffeatures = features.filter(function(e){
        return e.properties.workgroup === wid;
    });
    if(ffeatures.length < 1)
    {
        res.write(JSON.stringify({"result": "error", "desc": "Feature is not found."}));
        logger.info("errorcode : 7, " + inputdesc);
        res.end();
        return;
    }
    var inPolygon = undefined;
    if(ffeatures[0] != undefined)
        inPolygon = gju.pointInPolygon({"type": "Point", "coordinates": [x, y]}, ffeatures[0].geometry);
    if(inPolygon == undefined)
    {
        res.write(JSON.stringify({"result": "error", "desc": "Internal Error."}));
        logger.info("errorcode : 8, " + inputdesc);
        res.end();
        return;
    }
    if(inPolygon)
    {
        res.write(JSON.stringify({"result": "success", "in": true}));
    } else {
        res.write(JSON.stringify({"result": "success", "in": false}));
    }
    logger.info("success: " + inPolygon + ", " + inputdesc);
    console.log("success: " + inPolygon + ", " + inputdesc);
    console.log("-- 正镶白旗精准扶贫签到位置判断工具，请勿关闭! -- ");
    res.end();
 
}).listen(8100);
