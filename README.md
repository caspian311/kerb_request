#kerb_request

This is meant to be a Node.js library for doing web requests against a web server that is protected by Kerberos. In reality, it's just a wrapper around some command line tools (kinit, kdestroy and curl).

### Prerequisites
This module requires certain command line utilities to be installed to the machine before it can be used.

    sudo apt-get install -y krb5-user libkrb53 curl

### Installation

    npm install kerb_request

### Example usage
In a file named request:

    #!/usr/bin/env node

    var kerb_request = require('kerb_request');

    if (process.argv.length != 5) {
       console.log('USAGE: ' + __filename + ' <username> <password> <url>');
       process.exit(1);
    }

    var arguments = process.argv.slice(0);
    var executable = arguments.shift(); // throw away
    var programFile = arguments.shift(); // throw away

    var username = arguments.shift();
    var password = arguments.shift();
    var url = arguments.shift();

    kerb_request(username, password, url);
    
Then run it using:

    ./request matt.todd@DOMAIN.LAN 'my_pass_word' http://protected-site.domain.lan