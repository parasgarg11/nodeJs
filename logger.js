//For rest operations
var url= 'http://';
function log(message){
    console.log(message);
}


//EXTENDING EVENTEMITTER
const EventEmitter = require('events'); 
const emitter = new EventEmitter();

var url= 'http://';
function log(message){
    console.log(message);

    emitter.emit('messageLogged', {id: 1, url: 'http://'});
}
module.exports = log;

//EXTENDING EVENTEMITTER Update
const EventEmitter = require('events'); 

var url= 'http://';

class Logger extends EventEmitter{ //class will have all the functionality defined in event emitter and log is an additonal functionality
    log(message){
        console.log(message);
    
        this.emit('messageLogged', {id: 1, url: 'http://'}); //this references Logger class and EventEmitter 
    }
}

module.exports = Logger;