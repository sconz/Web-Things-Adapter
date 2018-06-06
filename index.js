var http = require("http");
var url = require("url");
var querystring = require("querystring");
var server = http.createServer();
var port = process.env.PORT || 3000;

const shell = require('shelljs');

server.on("request", function (request, response) {
  var uri = url.parse(request.url);
  var qs = uri.query ? querystring.parse(uri.query) : {};

  var status = qs.status || 200;
  var contentType = qs.contentType || "text/plain";
  var body = qs.body || "IoT device works fine!";

  console.log(qs.iot-passwrod);
  console.log(qs.iot-name);
  console.log(qs.iot-property);
  console.log(qs.iot-command);

  response.writeHead(status, {
    "Content-Type": contentType,
    "Content-Length": body.length
  });

  console.log(uri.pathname + " - HTTP " + status + " (" + contentType + "): " + body);
  console.log(qs);

  //shell.exec(comandToExecute, {silent:true}).stdout;
  shell.exec('./get-things.sh'+' '+qs.iot-name+' '+qs.iot-property+' '+iot-command);

  response.end(body);
});

server.listen(port, function () {
  console.log("listening on port " + port);
});
