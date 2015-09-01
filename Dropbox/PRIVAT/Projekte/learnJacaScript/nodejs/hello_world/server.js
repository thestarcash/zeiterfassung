/*
 * first draft of HelloWorld
 * console.log("HelloWorld");
 */

var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname);


      route(handle, pathname, response, request);
    }


  http.createServer(onRequest).listen(8080);
 console.log('server started');
}

exports.start = start;
