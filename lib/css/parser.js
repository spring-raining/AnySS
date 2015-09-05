"use strict";

var lq = require("loquat");
var lexer = require("./lexer.js");
var tokens = require("./tokens.js");
var rules = require("./rules.js");

function token(calcValue) {
  return lq.token(
      function(token) { return token.toString(); },
      calcValue,
      function(token) { return token.pos; }
  )
}

function tokenOf(tokenClass) {
  return token(function(token) {
    if (token instanceof tokenClass) {
      return [token];
    }
    else {
      return [];
    }
  });
}

function tokenNoneOf(tokenClasses) {
  return token(function(token) {
    var success = true;
    tokenClasses.forEach(function(e) {
      if (token instanceof e)
        success = false;
    });
    return success? [token] : [];
  });
}

function tokenWithExactValue(tokenClass, value) {
  return token(function(token) {
    if (token instanceof tokenClass && token.value === value) {
      return [token];
    }
    else {
      return [];
    }
  })
}

function functionBlock(parser) {
  var content = parser;
  if (content === undefined) {
    content = new lq.LazyParser(function() {
      return lq.choice([
        tokenNoneOf([
          tokens.OpenBraceToken,
          tokens.OpenParenToken,
          tokens.OpenBracketToken,
          tokens.FunctionToken,
          tokens.CloseParenToken
        ]),
        braceBlock(),
        parenBlock(),
        bracketBlock(),
        functionBlock()
      ]).many()
    });
  }
  return tokenOf(tokens.FunctionToken).bind(function(f) {
    return content.bind(function(c) {
      return tokenOf(tokens.CloseParenToken).bind(function(cl) {
        var contents = (c instanceof Array)? c : [c];
        return lq.pure(new rules.FunctionBlock(f.pos, f, contents, cl));
      });
    });
  }).label("function block");
}

function braceBlock(parser) {
  var content = parser;
  if (content === undefined) {
    content = new lq.LazyParser(function() {
      return lq.choice([
        tokenNoneOf([
          tokens.OpenBraceToken,
          tokens.OpenParenToken,
          tokens.OpenBracketToken,
          tokens.FunctionToken,
          tokens.CloseBraceToken
        ]),
        braceBlock(),
        parenBlock(),
        bracketBlock(),
        functionBlock()
      ]).many()
    });
  }
  return tokenOf(tokens.OpenBraceToken).bind(function(op) {
    return content.bind(function(c) {
      return tokenOf(tokens.CloseBraceToken).bind(function (cl) {
        var contents = (c instanceof Array)? c : [c];
        return lq.pure(new rules.BraceBlock(op.pos, op, contents, cl));
      });
    });
  }).label("brace block");
}

function parenBlock(parser) {
  var content = parser;
  if (content === undefined) {
    content = new lq.LazyParser(function() {
      return lq.choice([
        tokenNoneOf([
          tokens.OpenBraceToken,
          tokens.OpenParenToken,
          tokens.OpenBracketToken,
          tokens.FunctionToken,
          tokens.CloseParenToken
        ]),
        braceBlock(),
        parenBlock(),
        bracketBlock(),
        functionBlock()
      ]).many()
    });
  }
  return tokenOf(tokens.OpenParenToken).bind(function(op) {
    return content.bind(function(c) {
      return tokenOf(tokens.CloseParenToken).bind(function (cl) {
        var contents = (c instanceof Array)? c : [c];
        return lq.pure(new rules.ParenBlock(op.pos, op, contents, cl));
      });
    });
  }).label("paren block");
}

function bracketBlock(parser) {
  var content = parser;
  if (content === undefined) {
    content = new lq.LazyParser(function() {
      return lq.choice([
        tokenNoneOf([
          tokens.OpenBraceToken,
          tokens.OpenParenToken,
          tokens.OpenBracketToken,
          tokens.FunctionToken,
          tokens.CloseBracketToken
        ]),
        braceBlock(),
        parenBlock(),
        bracketBlock(),
        functionBlock()
      ]).many()
    });
  }
  return tokenOf(tokens.OpenBracketToken).bind(function(op) {
    return content.bind(function(c) {
      return tokenOf(tokens.CloseBracketToken).bind(function (cl) {
        var contents = (c instanceof Array)? c : [c];
        return lq.pure(new rules.BracketBlock(op.pos, op, contents, cl));
      });
    });
  }).label("bracket block");
}

function important() {
  return tokenWithExactValue(tokens.DelimToken, "!").bind(function(e) {
    return tokenWithExactValue(tokens.IdentToken, "important").bind(function(i) {
      return lq.pure(new rules.Important(e.pos, e, i));
    });
  }).label("important");
}

function declaration() {
  var parser = lq.choice([
    tokenNoneOf([
      tokens.OpenBraceToken,
      tokens.OpenParenToken,
      tokens.OpenBracketToken,
      tokens.FunctionToken,
      tokens.CommaToken,
      tokens.SemicolonToken]),
    braceBlock(),
    parenBlock(),
    bracketBlock(),
    functionBlock()
  ]);
  return tokenOf(tokens.IdentToken).bind(function(i) {
    return tokenOf(tokens.ColonToken).bind(function(l) {
      return parser
        .sepBy(tokenOf(tokens.CommaToken))
        .bind(function(c) {
          return lq.option(null, important()).bind(function(m) {
            return lq.pure(new rules.Declaration(i.pos, i, l, c, m));
          });
        });
    });
  }).label("declaration");
}

function declarationList() {
  return lq.getPosition.bind(function(pos) {
    return lq.option([],
      declaration().bind(function(head) {
        return tokenOf(tokens.SemicolonToken)
          .then(lq.option(null, declaration()))
          .many()
          .bind(function(tail) {
            var r = [head];
            tail.forEach(function(e) {
              if (e) r.push(e);
            });
            return lq.pure(r);
          });
      })
    ).bind(function(dec) {
      return lq.pure(new rules.DeclarationList(pos, dec))
    });
  }).label("declaration list");
}

// for contents of @page
function declarationListWithAtRule() {

}

function qualifiedRule() {
  var qualifiedTarget = lq.choice([
    tokenNoneOf([
      tokens.OpenBraceToken,
      tokens.OpenParenToken,
      tokens.OpenBracketToken,
      tokens.FunctionToken
    ]),
    parenBlock(),
    bracketBlock(),
    functionBlock()
  ]).many();

  return lq.getPosition.bind(function(pos) {
    return qualifiedTarget.bind(function (c) {
      return braceBlock(declarationList()).bind(function (b) {
        return lq.pure(new rules.QualifiedRule(pos, c, b));
      });
    });
  }).label("qualified rule")
    .try();
}

function atCharsetRule() {
  return tokenWithExactValue(tokens.AtKeywordToken, "@charset")
    .bind(function(a) {
      return tokenOf(tokens.StringToken).bind(function(t) {
        return tokenOf(tokens.SemicolonToken).bind(function(s) {
          return lq.pure(new rules.AtRule(a.pos, a, [t], s));
        });
      });
    });
}

function atImportRule() {
  return tokenWithExactValue(tokens.AtKeywordToken, "@import")
    .bind(function(a) {
      return lq.choice([
        tokenOf(tokens.StringToken),
        tokenOf(tokens.UrlToken)
      ]).bind(function(h) {
        return tokenOf(tokens.IdentToken)
          .sepBy(tokenOf(tokens.CommaToken))
          .bind(function(t) {
            return tokenOf(tokens.SemicolonToken).bind(function(s) {
              var comp = [h].concat(t);
              return lq.pure(new rules.AtRule(a.pos, a, comp, s))
            });
          });
      });
    });
}

function generalAtRule() {
  return tokenOf(tokens.AtKeywordToken)
    .bind(function(a) {
      return tokenOf(tokens.IdentToken)
        .sepBy(tokenOf(tokens.CommaToken))
        .bind(function(c) {
          return braceBlock(declarationList()).bind(function(t) {
            return lq.pure(new rules.AtRule(a.pos, a, c, t));
          });
        });
    });
}

function atRule() {
  return lq.choice([
    atCharsetRule(),
    atImportRule(),
    generalAtRule()
  ]).label("at-rule");
}

var css = lq.getPosition
  .bind(function(pos) {
    return lq.choice([
      tokenOf(tokens.CDOToken),
      tokenOf(tokens.CDCToken),
      atRule(),
      qualifiedRule()
    ]).many().bind(function(states) {
      return lq.eof.bind(function() {
        return lq.pure(new rules.Stylesheet(pos, states));
      });
    });
  });

module.exports = css;