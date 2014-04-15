var suppose = require('suppose')
   , exec = require('child_process').exec;

function kerb_request(username, password, url, callback) {
   kinit(username, password, function() {
      curl(url, function(output) {
         kdestroy(function() {
            callback(output);
         })
      });
   });
}


function kinit(username, password, callback) {
   suppose('kinit', [ username ])
      .on('Password for ' + username + ': ').respond(password + '\n')
      .end(function(code) {
         callback(code)
      });
}


function curl(url, callback) {
   exec('curl -f -s -S --negotiate -u : ' + url, function(err, stdout, stderr){
      if (err) {
         console.log('Error: ' + err);
      } else {
         callback(stdout);
      }
   });
}

function kdestroy(callback) {
   exec('kdestroy', function(err, stdout, stderr){
      if (err) {
         console.log('Error: ' + err);
      } else {
         callback(stdout);
      }
   });
}


module.exports = kerb_request;

