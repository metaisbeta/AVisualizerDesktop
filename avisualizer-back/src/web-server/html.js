//server constants / library
const http = require("http");
const host = 'localhost';
const port = 8000;

//shell / file system libraries
const fs = require('fs');
const { exec } = require('child_process');

//constant directories / .jar
const projectsFolder = './projects/';
const sniffer = 'asniffer.jar';
var IncomingForm = require('formidable').IncomingForm



const requestListener = function (req, res) {

console.log(req.url)
switch (req.url) {
        case "/projects":
        	console.log("e")
		fs.readdir(projectsFolder,{ withFileTypes: true }, (err, files) => {
		var fileNames = files.filter(dirent => dirent.isDirectory())
		    .map(dirent => dirent.name);
		    res.setHeader('Access-Control-Allow-Origin', '*');
		    res.setHeader('Access-Control-Allow-Methods', '*');
		    res.setHeader('Access-Control-Allow-Headers', '*');
		    res.setHeader("Content-Type", "text");
		    res.writeHead(200);
		    res.end(String(fileNames));
		});
               break
       
	case "/asniffer":
		var fileName;
		var form = new IncomingForm()
		form.uploadDir = './asniffer/'
		form.keepExtensions = true;
		form.keepFilenames = true;
		form.on('error', function(err) {
			     throw err;
			     })		      
		     .on ('fileBegin', function(name, file){
			     file.path = form.uploadDir + file.name;
		      });
		form.parse(req, function(err, fields, files) {
		 	
			if (err) {
				console.log('some error', err)
			}else if (!files.file) {
				console.log('no file received')  
			}else {
				var file = files.file
				console.log('saved file to', file.path)
				console.log('original name', file.name)
				console.log('type', file.type)
				console.log('size', file.size)
				fileName = file.path;
				var path = fileName.replace(".zip",'');
				var name = file.name.replace(".zip",'');
				console.log("name = "+path);
				//$1 = fileName $2 = path $3 = name
				console.log(fileName,path,name)
				exec('./test.sh '+fileName+' '+path+' '+name+' > x.out', (err, stdout, stderr) => {
		  			if (err) {
						console.log("error")
		  			} else {   
						console.log(`stdout: ${stdout}`);
						console.log(`stderr: ${stderr}`);
		  			}
				});
//				exec('unzip '+fileName+' -d ./asniffer/', (err, stdout, stderr) => {
//		  			if (err) {
//						console.log("error")
//		  			} else {   
//						console.log(`stdout: ${stdout}`);
//						console.log(`stderr: ${stderr}`);
//		  			}
//				});
//				console.log('java -jar ./asniffer/asniffer.jar -p '+path+' -r ./projects/ -t jsonAV')
//				exec('java -jar ./asniffer/asniffer.jar -p '+path+' -r ./projects/ -t jsonAV', (err, stdout, stderr) => {
//		  			if (err) {
//						console.log("error")
//		  			} else {   
//						console.log(`stdout: ${stdout}`);
//						console.log(`stderr: ${stderr}`);
//		  			}
//				});
//				exec('mkdir ./projects/'+name, (err, stdout, stderr) => {
//		  			if (err) {
//						console.log("error")
//		  			} else {   
//						console.log(`stdout: ${stdout}`);
//						console.log(`stderr: ${stderr}`);
//		  			}
//				});
//				exec('sleep 10 && mv ./projects/asniffer_results/*.json ./projects/'+name, (err, stdout, stderr) => {
//		  			if (err) {
//						console.log("error")
//		  			} else {   
//						console.log(`stdout: ${stdout}`);
//						console.log(`stderr: ${stderr}`);
//		  			}
//				});
//				exec('sleep 10 && rm -r ./projects/asniffer_results/', (err, stdout, stderr) => {
//		  			if (err) {
//						console.log("error")
//		  			} else {   
//						console.log(`stdout: ${stdout}`);
//						console.log(`stderr: ${stderr}`);
//		  			}
//				});
				
			}
		})

		break
        default:
        	console.log("here")
		    res.setHeader('Access-Control-Allow-Origin', '*');
		    res.setHeader('Access-Control-Allow-Methods', '*');
		    res.setHeader('Access-Control-Allow-Headers', '*');
		    res.setHeader("Content-Type", "application/json");
		var filedir = String(projectsFolder+req.url);  
		console.log(filedir)  
		let rawdata = fs.readFileSync(filedir);
		let data = JSON.parse(rawdata);
		res.writeHead(200);
		res.end(JSON.stringify(data));
		break
            
    }



};



const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
