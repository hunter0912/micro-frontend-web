'use strict'
const path = require('path');
const config = require('../config');

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

    console.log(path.posix.join(assetsSubDirectory, _path))
  return path.posix.join(assetsSubDirectory, _path)
};


