var Docker = require('dockerode');
var languages = require('./languages');

var medieval = {};

// medieval = {
//   node: () => ...,
//   ruby: () => ...,
//   ...
// }
Object.keys(languages).forEach(function(name) {
  var definition = languages[name];
  var image = definition.image;
  var commandBase = definition.commandBase;

  // Main definition of the runner function here
  medieval[name] = function(script, options) {
    var options = parseOptions(options);
    var docker = new Docker();

    return docker.pull(image)
      .then(function(stream) {
        // wait for the pull stream to complete
        return new Promise(function(resolve, reject) {
          docker.modem.followProgress(stream, function(err, output) {
            if (err) return reject(err);
            else return resolve();
          });
        })
      })
      .then(function() {
        // run the snippet
        return docker.run(image, commandBase.concat(script), [options.stdout, options.stderr], {
          tty: false // split stdout and stderr
        });
      });
  }
})

function parseOptions(options) {
  var defaultOptions = {
    stdout: process.stdout,
    stderr: process.stderr
  }

  return Object.assign(defaultOptions, options);
}

module.exports = medieval;