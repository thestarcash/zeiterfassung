function route(handle, pathname, response, request) {
  console.log("Request for " + pathname);
  if (handle.hasOwnProperty(pathname)) {
//  if (1===2) {
    handle[pathname](response, request);
  }
  else {
    console.log("no Requesthandler for " + pathname);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("no Requesthandler for " + pathname);
    response.end();
  }
}

exports.route = route;
