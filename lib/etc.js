"use strict";

var lq = require("loquat");

function countTo(n, parser) {
  if (n <= 0) {
    return lq.pure([]);
  }
  else {
    return new lq.Parser(function (state, csuc, cerr, esuc, eerr) {
      var accum = [];
      var currentState = state;
      var currentError = lq.ParseError.unknown(state.position);
      var consumed = false;
      var stop = false;
      var counter = 0;
      while (counter < n) {
        parser.run(currentState, csuc_, cerr_, esuc_, eerr_);
        if (stop) {
          if (consumed) {
            return csuc(accum, currentState, currentError);
          }
          else {
            return esuc(accum, currentState, currentError);
          }
        }
        counter++;
      }
      if (consumed) {
        return csuc(accum, currentState, currentError);
      }
      else {
        return esuc(accum, currentState, currentError);
      }

      function csuc_ (value, state, error) {
        consumed = true;
        accum.push(value);
        currentState = state;
        currentError = error;
      }

      function cerr_ (error) {
        consumed = true;
        stop = true;
        currentError = error;
      }

      function esuc_ (value, state, error) {
        accum.push(value);
        currentState = state;
        currentError = lq.ParseError.merge(currentError, error);
      }

      function eerr_ (error) {
        stop = true;
        currentError = lq.ParseError.merge(currentError, error);
      }
    });
  }
}

function countFromTo(m, n, parser) {
  return parser.count(m).bind(function (xs) {
    return countTo(n - m, parser).bind(function (ys) {
      return lq.pure(xs.concat(ys));
    });
  });
}

module.exports = {
  countTo: countTo,
  countFromTo: countFromTo,
};