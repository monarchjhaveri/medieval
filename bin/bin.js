#!/usr/bin/env node

var prog = require('caporal');
var medieval = require('../main');
var version = require('../package.json').version;
var server = require('./server');

var builder = prog.version(version);

Object.keys(medieval).forEach(function(runtime) {
  builder
    .command(runtime, 'Evaluates ' + runtime + ' code')
    .argument('<script>', 'Script to evaluate')
    .action(function(args, options, logger) {
      var script = args.script;
      var runner = medieval[runtime]

      runner(script)
        .then(function({stdout, stderr, statusCode}) {
          if (stdout) {
            console.log(stdout);
          }

          if (stderr) {
            console.error(stderr);
          }

          process.exit(statusCode);
        })
        .catch(function(err) {
          console.log("ERROR WHILE RUNNING COMMAND [medieval " + runtime + "]", err);
        });
    });
});

builder
  .command('serve', 'Runs the evaluator in server mode')
  .option('--port [port]', 'Port to run server on', prog.INT, 1337)
  .action(function(args, options, logger) {
    server.serve(options.port)
      .then(receivedPort => console.log(`MediEval server listening on port ${receivedPort}`));
  })



prog.parse(process.argv);