#!/usr/bin/env node

var prog = require('caporal');
var medieval = require('../main');
var version = require('../package.json').version;

var builder = prog.version(version);

Object.keys(medieval).forEach(function(runtime) {
  builder
    .command(runtime, 'Evaluates ' + runtime + ' code')
    .argument('<script>', 'Script to evaluate')
    .action(function(args, options, logger) {
      var script = args.script;
      var runner = medieval[runtime]

      runner(script)
        .then(function(data) {
          var statusCode = data.output.StatusCode;
          process.exit(statusCode);
        })
        .catch(function(err) {
          console.log("ERROR WHILE RUNNING medieval " + runtime + "!", err);
        });
    });
});



prog.parse(process.argv);