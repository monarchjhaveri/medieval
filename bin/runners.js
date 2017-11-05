var Docker = require('dockerode');

module.exports = {
  node: function(script) {
    var docker = new Docker();

    return docker.run('node:9.0.0-alpine', ['node', '-e', script], [process.stdout, process.stderr], {
      tty: false // split stdout and stderr
    })
  }
};
