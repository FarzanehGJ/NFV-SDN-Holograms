// Server for Decoding with draco_decoder

const http = require('http');
var url = require('url');
const fs = require('fs')
const host = 'localhost';
const port = 8080;

// This function will run the draco_decoder to decode each drc file to ply
async function response(fileNum,res){

    const subExec = require("child_process");
    command = "./draco/build_dir/draco_decoder  -i ./encoderOut/"+fileNum+".drc -o ./decoded/"+fileNum+".ply";
    console.log(command);
    subExec.exec(command);
    //await wait(command,subExec);
    const path = "./decoded/"+fileNum+".ply";
    await wait(fs,path);
    res.writeHead(200);
    res.end('200');
}

function wait(fs,path){
    return new Promise((resolve) => {
        while(!fs.existsSync(path)){
            continue;
        }
        resolve(fs.existsSync(path));
    });
}

const server = http.createServer(function (req,res){
    res.setHeader("Access-Control-Allow-Origin", "*"); //added to resolve "No 'Access-Control-Allow-Origin' " error
    let address = url.parse(req.url,true);
    var Url = address.href;
    var fileNum = Url.split("/");
    fileNum = fileNum[1].split(".");
    if (fileNum[0] != ''){
        response(fileNum[0],res);
    }
    else {
        res.writeHead(404);
        res.end("error");
    }
});

// Listen to port 8080
server.listen(port, host, () => {
    console.log(`Server is running on http:${host}:${port}`);
});