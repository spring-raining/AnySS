"use strict";

var lq = require("loquat");
var lexer = require("./lexer.js");
var parser = require("./parser.js");

var notImplementedMessage = function(language) {
  return {
    succeeded: false,
    error: {
      message: language + " was not implemented."
    }
  }
};

var AnySS = {
  tokenize: function(language, filename, target) {
    switch (language.toLowerCase()) {
      case "css":
        return lq.parse(lexer.css, filename, target);
      default:
        return notImplementedMessage(language);
    }
  },
  parse: function(language, filename, target) {
    var lexed = target;
    if (typeof(target) === 'string' || target instanceof String) {
      var result = this.tokenize(language, filename, target);
      if (result.succeeded) {
        lexed = result.value;
      } else {
        return result;
      }
    }
    switch(language.toLowerCase()) {
      case "css":
        return lq.parse(parser.css, filename, lexed);
      default:
        return notImplementedMessage(language);
    }
  }
};

module.exports = AnySS;