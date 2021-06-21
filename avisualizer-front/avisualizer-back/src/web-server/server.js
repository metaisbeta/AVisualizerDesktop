const http = require('http');
const directory = './projects/';
const path = require('path')
var url = require('url')
const { exec } = require("child_process");
const platform = process.platform;
fs = require('fs')
var IncomingForm = require('formidable').IncomingForm
const requestListener = function (req, res) {
	//console.log(__dirname)
  switch(req.url){
  	case  "/projects":
  		   var arr = []
    		var x = fs.readdir(path.resolve(__dirname+"/projects/"), (err, files) => {
	    		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');			
	    		res.setHeader('Content-Type', 'text');
			res.writeHead(200);		
	  		res.end(files.toString());
    		

		});

  		break
  	case  "/asniffer":
  		var form = new IncomingForm().on('fileBegin', function(name, file){
            //rename the incoming file to the file's name
            file.path = path.resolve(form.uploadDir + "/" + file.name);
            
    })
		form.uploadDir = path.resolve(__dirname+'/asniffer');
		form.keepExtensions = true;
		    
		form.parse(req, function(err, fields, files) {
			if (err) {
				console.log('some error', err)
			} else if (!files.file) {
				console.log('no file received')
			} else {
				var file = files.file
				//console.log('saved file to', file.path)
				//console.log('original name', file.name)
				//console.log('type', file.type)
				//console.log('size', file.size)
				var filePath = file.path;
				//var filePath = form.uploadDir;
				var fileName = file.name.replace(".zip","");
				
				var originalName = file.name;
				
			}
			
			console.log("eeee ",path.resolve(__dirname))
			console.log("./"+path.resolve(__dirname)+"/asniffer.sh "+filePath+" "+fileName+" "+originalName)
			if(platform=="linux" || platform=="darwin"){
		  		exec(path.resolve(__dirname)+"/asniffer.sh "+filePath+" "+fileName+" "+originalName+" "+path.resolve(__dirname), (error, stdout, stderr) => {
				    	console.log(`stdout: ${stdout}`);
				    	
				});			
			}else{
				exec(path.resolve(__dirname)+"/asniffer.bat "+filePath+" "+fileName+" "+originalName+" "+path.resolve(__dirname), (error, stdout, stderr) => {
				    	console.log(`stdout: ${stdout}`);
				    	
				});	
			}

		})
  		break
  	default:
  		fs.readFile(path.resolve(__dirname+"/projects"+req.url), 'utf8', function (err,data) {
		  	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');			
	    		res.setHeader('Content-Type', 'application/json');
			res.writeHead(200);
		  	res.end(data);
		});
  		break	
  }	

}

const server = http.createServer(requestListener);
server.listen(8000);

