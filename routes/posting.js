const express = require('express');
const router = express.Router();
const steem = require('steem');

router.get('/:account/:category/:title', function(req, res, next) {
  let permlink = new Date()
    .toISOString()
    .replace(/[^a-zA-Z0-9]+/g, '')
    .toLowerCase();
  let jsonMetadata = {};
  if (req.query.tag) {
    if (!Array.isArray(req.query.tag)) {
      req.query.tag = [].push(req.query.tag);
    }
    jsonMetadata = { tags: req.query.tag.slice(0, 4) };
  }
  if (req.app.get('env') === 'development') {
    steem.api.setOptions({
      url: 'wss://testnet.steem.vc',
      address_prefix: 'STX',
      chain_id:
        '79276aea5d4877d9a25892eaa01b0adf019d3e5cb12a97478df3298ccdd01673'
    });
  } else {
    steem.api.setOptions({
      url: process.env.STEEM_ENDPOINT || 'https://api.steemit.com'
    });
  }
  let promise = new Promise((resolve, reject) => {
    steem.broadcast.comment(
      process.env.POSTING_KEY,
      '',
      req.params.category,
      req.params.account,
      permlink,
      req.params.title,
      'Test_body',
      jsonMetadata,
      function(err, response) {
        if (!err) {
          resolve(response);
        } else {
          reject(err);
        }
      }
    );
  });
  promise
    .then(p => {
      res.send(''.concat('<pre><code>',JSON.stringify(p, null, 4), '</pre></code>'));
    })
    .catch(e => {
      next(e);
    });
});

module.exports = router;
