const express = require('express')
const bodyParser = require('body-parser');
const medieval = require('../main');

module.exports = {
  serve: function serve(port) {
    return new Promise(function(resolve, reject) {
      const app = express()

      app.use( bodyParser.json() );
      app.post('/', (req, res, next) => {
        const code = req.param('code', null);
        const runtime = req.param('runtime', null);

        if (!code || !runtime) {
          res.status(400);
          res.send({message: 'Bad request'})
        } else {
          medieval[runtime](code)
            .then(({stdout, stderr, statusCode}) => {
                res.send({stdout, stderr, statusCode})
            })
            .catch(err => {
              next(err);
            })
        }
      });

      var listener = app.listen(port, () => {
        resolve(listener.address().port);
      });
    })
  }
}