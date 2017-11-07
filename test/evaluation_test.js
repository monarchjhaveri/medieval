var medieval = require('../main.js');
var languages = require('../languages');
var expect = require('chai').expect;

const SIMPLE_STATEMENTS = [
  { language: 'node', statement: 'console.log("Hello World")', errorStatement: 'this.will.fail' },
  { language: 'ruby', statement: 'puts "Hello World"', errorStatement: 'this.will.fail'  },
  { language: 'python', statement: 'print("Hello World")', errorStatement: 'this.will.fail'  }
]

describe('Evaluation', function() {
  SIMPLE_STATEMENTS.forEach(({language, statement, errorStatement}) => {
    const __LANGUAGE__ = language;
    const __STATEMENT__ = statement;
    const __ERROR_STATEMENT__ = errorStatement;

    describe(__LANGUAGE__, function() {
      it('should return stdout and statusCode of 0 on success', function(done) {
        medieval[__LANGUAGE__](__STATEMENT__)
        .then(({stdout, stderr, statusCode}) => {
          // debugger;
          expect(stdout).to.equal('Hello World\n');
          expect(stderr).to.equal('');
          expect(statusCode).to.equal(0);
          expect()
          done();
        })
      })

      it('should return stderr and non-0 statusCode on error', function(done) {
        medieval[__LANGUAGE__](__ERROR_STATEMENT__)
        .then(({stdout, stderr, statusCode}) => {
          expect(stderr.length).to.not.equal(0);
          expect(stdout).to.equal('');
          expect(statusCode).to.not.equal(0);
          done();
        })
      })
    })
  })
});