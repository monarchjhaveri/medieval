var Writable = require('stream').Writable;

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
      it('should accept stdout as an option', function(done) {
        let output = '';

        var stdout = new Writable({
          write: (dataBuffer) => output += dataBuffer.toString('utf-8')
        });

        medieval[__LANGUAGE__](__STATEMENT__, {stdout: stdout})
        .then(() => {
          expect(output).to.equal('Hello World\n');
          done();
        })
      })

      it('should accept stderr as an option', function(done) {
        let output = '';

        var stderr = new Writable({
          write: (dataBuffer) => output += dataBuffer.toString('utf-8')
        });

        medieval[__LANGUAGE__](__ERROR_STATEMENT__, {stderr: stderr})
        .then(() => {
          expect(output).to.not.be.empty;
          done();
        })
      })
    })
  })
});