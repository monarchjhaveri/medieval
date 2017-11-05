# Medi***eval***

A library that lets you evaluate multiple languages securely.

Currently supported:
* Node.js
* Ruby
* Python

## Installation
First, ensure that you have Docker installed.

To instal in NPM, run the following command:
`npm install -g medieval`

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

