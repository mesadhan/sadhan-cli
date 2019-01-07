#!/usr/bin/env node

let fs = require('fs');
let path = require('path');

fs.readFile(path.resolve(__dirname, 'bears.txt'), function (err, data) {

    let bears = data.toString().slice('\n');
    console.log('message', bears);

});