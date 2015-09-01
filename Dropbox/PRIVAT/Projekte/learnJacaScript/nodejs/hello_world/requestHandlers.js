
//var exec = require("child_process").exec;
var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response) {
  console.log("Start handler runs!");
  var body = '<html>'+
  '<head>'+
  '<meta http-equiv="Content-Type" content="text/html;" '+
  'charset=UTF-8" />'+
  '</head>'+
  '<body>'+
  '<form action="/upload" enctype="multipart/form-data" '+
  'method="post">'+

  '<input type="file" name="upload" multiple="multiple">'+
  '<input type="submit" value="Upload File" />'+
  '</form>'+
  '</body>'+
  '</html>';

      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(body);
      response.end();
}

function upload(response, request) {
  console.log("Upload handler runs!");
  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("pasing done");
    fs.rename(files.upload.path, "/tmp/test.png", function(error) {
      if (error) {
      fs.unlink("/tmp/test.png");
      fs.rename(files.upload.path, "/tmp/test.png");
    }
  });

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("received image:<br>");
  response.write("<img src='/show' />");
  response.end();
    });
}

function show(response) {
  console.log("Request handler 'show' was called");
  response.writeHead(200, {"Content-Type": "image/png"});
  fs.createReadStream("/tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;