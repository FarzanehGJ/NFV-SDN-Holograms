const http = require('http');
var url = require('url');
const fs = require('fs');

const host = 'localhost';
const port = 8080;

function response(fileNum,res){
    // decode only one file
    const subExec = require("child_process");
    let command = " ";
    command = "./draco/build_dir/draco_decoder  -i ./out/"+fileNum+".drc -o ./decoded/"+fileNum+".ply";
    console.log(command);
    subExec.exec(command);
    console.log("Done!");
    res.writeHead(200);
    res.end('200');
}

const server = http.createServer(function (req,res){

    let address = url.parse(req.url,true);
    var Url = address.href;
    var fileNum = Url.split("/");
    fileNum = fileNum[1].split(".");
    if (fileNum[0] != ''){
        response(fileNum[0],res);
    }
    else {
        res.writeHead(404);
    }
});

server.listen(port, host, () => {
    console.log(`Server is running on http:${host}:${port}`);
});

