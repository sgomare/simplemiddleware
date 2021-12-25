var https = require('https');
var fs = require('fs');
var cors = require('cors');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// maintain hostURL here
const backendUrl = '';

// Setup HTTPS
var privateKey = fs.readFileSync('workstation.jamb.io.key', 'utf8');
var certificate = fs.readFileSync('workstation.jamb.io.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };

app.use(cors());

const options = {
    target : backendUrl,
    changeOrigin: true,
    secure: false,
    logLevel: 'debug'
}

const myproxy = createProxyMiddleware(options);

// dummy middleware for '/' to set basic authentication
//app.use("/",(req,res,next) =>{
//    req.headers['Authorization'] = `Basic sdfasdfasflklkfslkfer==`;
//    next();  
//  });

app.use(myproxy);

// start HTTPS server on port 443
var httpserver = https.createServer(credentials,app);
httpserver.listen(443);




