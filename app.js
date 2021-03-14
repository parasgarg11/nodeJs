//References: https://www.youtube.com/watch?v=TlB_eWDSMt4
// Node Module System: 

// In browsers, window is a global object. In node there is global objects. But their scope is just inside the file. onsole.log is the global. E.g., 
// var message =''; 
// console.log(global.message); 
// There is problem with global scope, like if we define a function in another	file that new definition is override the previous definition. So we should avoid defining variables and functions in global scope. Instead use modularity, different modules just like encapsulated in a single unit and not override if having the same name. 
// Every node application has at least one file or one module which we call a main module and their scope is just inside the module. 

// Export a Module: 
// module.exports.log1 = log; //log is the function name in logger file want to use in app.js so we export it and names it to access using log1. Or can just module.exports = log; 

//  Loading a Module: 
// const logger = require('./logger'); 
// Console.log(logger); //it will show that log is there of function type 
// logger.log('message'); //you can access the function of another module. 
// jshint app.js //app.js can be any module name. Helpful to find errors in JS 

// Module Wrapper function: 
// (function (exports, require, module, __filename, __dirname){ 
//   //at runtime our code is converted to like this which is called Immediate Invoke Function 
// }) 

function sayHello(name){
    console.log('Hello ' + name);
}

sayHello('Garg'); 
// console.log(window);    //gives error
// console.log(module);

const path = require('path'); //this is built in module. If it’s not then check from ./path or ../path 
var pathObj = path.parse(__filename); 
console.log(pathObj); 

// Path Modules: 
//File System, HTTP, OS, Path, Process, Query Strings, Stream (check from node docs) 
    //app.js File 
const path = require('path'); //this is built in module. If it’s not then check from ./path or ../path 
var pathObj = path.parse(__dirname); 
console.log(pathObj); 

//-------------------------------------------------
// OS Module
const os = require('os'); 
var totalMemory = os.totalmem(); 
var freeMemory = os.freemem(); 
console.log('Total Memory: ' + totalMemory); 
console.log(`Free memory: ${freeMemory}`); 

//File System Module
const fs = require('fs'); 
const files = fs.readdirSync('./'); //FS comes every operation in two forms synchronous or blocking and asynchronous or non-blocking. Prefer to use Asyn and it check in current folder.
console.log(files); 

fs.readdir('./',function(err,files){
    if(err) console.log('Error', err);
    else console.log('Results', files);
});

//-----------------------------------------------------
//EVENTS MODULE

const EventEmitter = require('events'); //EventEmitter is a class and start with capital letter
const emitter = new EventEmitter(); //emitter is an object

//Register a listner 
emitter.on('messageLogged', function(){ //on or addListener is exactly same 
    console.log('Listner called'); //messageLogged is the name of event and function is the listener function
}); 

//Raise an event but no listener so we create above
emitter.emit('messageLogged'); //emit means produce - signalling


// ----------------------------------------------------
//EVENT ARGUMENTS (when raise an event, also send some data bt that event)

emitter.on('messageLogged', (arg) => { 
    console.log('Listner called', arg); 
}); 

emitter.emit('messageLogged', 1, 'url'); //additional event arguments
emitter.emit('messageLogged', {id: 1, url: 'http://'}); //better practice to encap those values inside an object


//------------------------------------------
//EXTENDING EVENTEMITTER

    const EventEmitter = require('events'); 
    const emitter = new EventEmitter(); 

    //Register a listner 
    emitter.on('messageLogged', (arg) =>{ 
        console.log('Listner called', arg);
    }); 

    const log = require('./logger');
    log('message'); //in console we get the message only of logger.js, this file event listner will not be called.
 
//EXTENDING EVENT EMITTER Update

    const EventEmitter = require('events'); 

    const Logger = require('./logger');
    const logger = new Logger(); // instead of using an instance of event emitter from above code, you use an instance of the custom class that defined and extends event emitter

    
    //Register a listner 
    logger.on('messageLogged', (arg) => { 
        console.log('Listner called', arg);
    }); 

    logger.log('message'); //now it prints message and Listener Called {id: 1, url: 'http://'} means print from both js files 

    //-----------------------------------------------
    //HTTP MODULE
    const http = require('http');
    const server = http.createServer();
    
    server.on('connection', (socket) =>{ //connection is the name of event ,2nd argument is the callback function or the actual listener
        console.log('New Connection...'); //if runs in a browser then shows this log
    }); 
    
    server.listen(3000);
    console.log('Listening on port 3000...');//server is listening on port 3000
    //whenever a new connection/request, this server raises an event so we use ON method to handle that event 

    
    //HTTP MODULE Update because in Real World we dont use above way 
    const http = require('http');
    const server = http.createServer((req, res) => {
        if(req.url == '/'){
            res.write('Hello World');
            res.end(); // shows write line in browser :localhost:3000
        }
        if(req.url === '/api/courses'){ //want to build a backend service to handle various routes
            res.write(JSON.stringify([1, 2, 3])); //want to return the list of courses from the database so we use JSON and return an array of Objects with numbers so it'll convert this array into a string
            res.end(); //if go to path of URL then it shows array of numbers  
        }
    });
    //for clean structure to handle various routes we use EXPRESS framework. This framework is build on top of the HTTP module in node.


    server.listen(3000);
    console.log('Listening on port 3000...');

