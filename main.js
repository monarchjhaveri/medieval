var Docker = require('dockerode');
var languages = require('./languages');
var Writable = require('stream').Writable;

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
  medieval[name] = function(script) {
    var docker = new Docker();

    let stdout = '';
    var stdoutStream = new Writable({
      write: (dataBuffer) => stdout += dataBuffer.toString('utf-8')
    });

    let stderr = '';
    var stderrStream = new Writable({
      write: (dataBuffer) => stderr += dataBuffer.toString('utf-8')
    });

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
        return docker.run(image, commandBase.concat(script), [stdoutStream, stderrStream], {
          tty: false // split stdoutStream and stderrStream
        })
        .then(function(data) {
          const statusCode = data.output.StatusCode;
          debugger;
          return Promise.resolve({stdout, stderr, statusCode})
        })
      })
;
  }
})

module.exports = medieval;