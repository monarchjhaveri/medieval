#!/usr/bin/env node

var prog = require('caporal');
var runners = require('./runners');
var version = require('../package.json').version;

var builder = prog.version(version);

Object.keys(runners).forEach(function(runtime) {
  builder
    .command(runtime, 'Evaluates ' + runtime + ' code')
    .argument('<script>', 'Script to evaluate')
    .action(function(args, options, logger) {
      var script = args.script;
      var runner = runners[runtime]

      runner(script)
        .then(function(data) {
          var statusCode = data.output.StatusCode;
          process.exit(statusCode);
        });
    });
});



prog.parse(process.argv);