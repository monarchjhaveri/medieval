#!/usr/bin/env node

var prog = require('caporal');
var runners = require('./runners');
var version = require('../package.json').version;

prog
  .version(version)
  .command('node', 'Evaluates Node.js code')
  .argument('<script>', 'Script to evaluate')
  .action(function(args, options, logger) {
    var script = args.script;

    runners.node(script)
      .then(function(data) {
        var statusCode = data.output.StatusCode;
        process.exit(statusCode);
      })
  })


prog.parse(process.argv);