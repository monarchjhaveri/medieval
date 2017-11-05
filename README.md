# MediEval

MediEval is a library that lets you evaluate code in several language runtimes. MediEval functionality is exposed in two convenient ways:
1. Command line executable, called 'medieval'
2. Node.js APIs, using `require('medieval')`. 

MediEval can be used to create code evaluators like those used at CodeAcademy, TestDome and repl.it. 

MediEval owes many thanks to Docker, on which it runs.

Runtimes currently supported:
* node
* ruby
* python

## Thankware
MediEval is thankware; which means I don't want any money for the effort I put into it... 

...but I *LOVE* getting paid in thank-you's!

Ways to thank me:
1. Twitter: [Help spread the word](https://twitter.com/intent/tweet?text=Hey%20%40monarchwadia!%20I%20love%20using%20%23MediEval!%20Thank%20you%20for%20the%20good%20work!%20https%3A%2F%2Fwww.npmjs.com%2Fmedieval%20%23javascript%20%40npmjs%20%40Docker) with #hashtags and @mentions! 
2. Twitter: [Follow me](https://twitter.com/intent/follow?screen_name=monarchwadia). My twitter handle is [@monarchwadia](https://twitter.com/monarchwadia)
3. Github: [Star MediEval on Github](https://github.com/monarchjhaveri/medieval)

## Restrictions
Currently (mostly because of the fact that the project is quite new at this moment), only Docker on Linux is supported. But this can change! [Let me know](https://github.com/monarchjhaveri/medieval#thankware) that you like MediEval! if enough people are using MediEval, I can absolutely add support for Windows and MacOS.

## Installation
0. Only supported on Linux. It might not work on Windows or MacOS. 
1. Ensure that you [have Docker installed](https://www.docker.com/).
2. Make sure that your user [can use Docker without sudo](https://askubuntu.com/questions/477551/how-can-i-use-docker-without-sudo).
3. `npm install -g medieval`

## NPM Instructions

```
const medieval = require('medieval');

// Node.js
let nodeScript = 'console.log("Hello World");'
medieval.node(nodeScript)
  .then(result => {
    console.log(result);  
  })
  .catch(err => {
    console.log(err);
  });

// Python
let pythonScript = 'print("Hello World")'
  medieval.python(pythonScript)
    .then(result => {
      console.log(result);  
    })
    .catch(err => {
      console.log(err);
    });
```

## Command Line Instructions

### Usage

```
   medieval 0.0.2 
     
   USAGE

     medieval <command> [options]

   COMMANDS

     node <script>        Evaluates node code                
     ruby <script>        Evaluates ruby code                
     python <script>      Evaluates python code              
     help <command>       Display help for a specific command

   GLOBAL OPTIONS

     -h, --help         Display help                                      
     -V, --version      Display version                                   
     --no-color         Disable colors                                    
     --quiet            Quiet mode - only displays warn and error messages
     -v, --verbose      Verbose mode - will also output debug messages    
```

### Examples

```
# In your terminal
medieval node "console.log('Hello ' + 'World')"
> Hello World
medieval python "print('Hello ' + 'World')"
> Hello World
medieval ruby "puts 'Hello ' + 'World'"
> Hello World
```

