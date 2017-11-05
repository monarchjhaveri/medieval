module.exports = {
  node: {
    image: 'node:9.0.0-alpine',
    commandBase: ['node', '-e']
  },
  ruby: {
    image: 'ruby:2.4.2-alpine3.6',
    commandBase: ['ruby', '-e']
  },
  python: {
    image: 'python:3.6.3-alpine3.6',
    commandBase: ['python', '-c']
  }
}