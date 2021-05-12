const fs = require('fs');

module.exports = {
  env: {
    runtime: fs.readFileSync('./lib/runtime.js').toString(),
  },
};
