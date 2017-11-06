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

  medieval[name] = function(script) {
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
        return docker.run(image, commandBase.concat(script), [process.stdout, process.stderr], {
          tty: false // split stdout and stderr
        });
      });
  }
})


module.exports = medieval;