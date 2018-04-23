var fs = require('fs');

// PACKAGE_ERROR and FILE_ERROR is shown on your error
fs.readFile('./node_modules/node-rsa/src/libs/jsbn.js', 'utf8', function (err,data) {
  if (err) return console.log(err);

  var result = data.replace('require(\'crypto\');', 'require(\'crypto-browserify\');');

  fs.writeFile('./node_modules/node-rsa/src/libs/jsbn.js', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });

});

fs.readFile('./node_modules/node-rsa/src/schemes/oaep.js', 'utf8', function (err,data) {
  if (err) return console.log(err);

  var result = data.replace('require(\'crypto\');', 'require(\'crypto-browserify\');');

  fs.writeFile('./node_modules/node-rsa/src/schemes/oaep.js', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });

});
