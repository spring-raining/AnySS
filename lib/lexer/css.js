/*
 *  ref: http://www.w3.org/TR/css-syntax-3/
 */

"use strict";

var lq = require("loquat");
var countFromTo = require("./../etc.js").countFromTo;

/* */

var languageDef = new lq.LanguageDef(
  "/*",
  "*/",
  "",
  false,
  undefined,
  undefined,
  undefined,
  undefined,
  [],
  [],
  true
);

var tokenParser = lq.makeTokenParser(languageDef);

/* */

var nonASCII = lq.satisfy(function(char) {
  return char.charCodeAt(0) >= 128;
});

var nonPrintable = lq.satisfy(function(char) {
  return char.charCodeAt(0) <= 8
      || char.charCodeAt(0) === 11
      || (char.charCodeAt(0) >= 14 && char.charCodeAt(0) <= 31)
      || char.charCodeAt(0) === 127;
});

var newline = lq.newline;

var whitespace = lq.space;

var digit = lq.digit;
var digits = digit.manyChar1();

var hexDigit = lq.hexDigit;

var escape = lq.char("\\")
  .then(lq.choice([
    lq.notFollowedBy(newline.or(hexDigit)).then(lq.anyChar),
    countFromTo(1, 6, hexDigit).then(lq.optional(whitespace))
  ]));

var whitespaceToken = whitespace.many1();

var ws = whitespaceToken.skipMany();

var identToken = lq.option("", lq.char("-"))
  .bind(function(h) {
    return lq.choice([
      lq.letter,
      lq.char("_"),
      nonASCII,
      escape
    ]).bind(function(c) {
      return lq.choice([
        lq.alphaNum,
        lq.char("_"),
        lq.char("-"),
        nonASCII,
        escape
      ]).manyChar().bind(function(cs) {
        return lq.pure(h + c + cs);
      });
    });
  })
  .label("ident token")
  .try();

var functionToken = identToken
  .bind(function(f) {
    return lq.char("(").bind(function(n) {
      return lq.pure(f + n);
    })
  })
  .label("function token")
  .try();

var atKeywordToken = lq.char("@")
  .bind(function(a) {
    return identToken.bind(function(t) {
      return lq.pure(a + t);
    })
  })
  .label("at keyword token")
  .try();

var hashToken = lq.char("#")
  .bind(function(h) {
    return lq.choice([
      lq.alphaNum,
      lq.char("_"),
      lq.char("-"),
      nonASCII,
      escape
    ]).manyChar1()
      .bind(function(s) {
        return lq.pure(h + s);
      });
  })
  .label("hash token")
  .try();

var stringToken = lq.choice([
  lq.char('"')
    .bind(function(s) {
      return lq.choice([
        lq.notFollowedBy(lq.char('"').or(lq.char("\\")).or(newline)).then(lq.anyChar),
        escape,
        lq.char("\\").then(newline).try()
      ]).manyChar()
        .bind(function(t) {
          return lq.char('"')
            .bind(function(r) {
              return lq.pure(s + t + r);
            })
        })
    }),
  lq.char("'")
    .bind(function(s) {
      return lq.choice([
        lq.notFollowedBy(lq.char("'").or(lq.char("\\")).or(newline)).then(lq.anyChar),
        escape,
        lq.char("\\").then(newline).try()
      ]).manyChar()
        .bind(function(t) {
          return lq.char("'")
            .bind(function(r) {
              return lq.pure(s + t + r);
            })
        })
    })
]).label("string token");

var urlUnquoted = lq.notFollowedBy(lq.choice([
  lq.oneOf("\"'()\\"),
  whitespace,
  nonPrintable
])).then(lq.anyChar).manyChar1();

var urlToken = lq.string("url(")
  .try()
  .bind(function(u) {
    return ws.then(lq.option("",
      lq.choice([
        urlUnquoted,
        stringToken
      ])
    )).bind(function (r) {
      return ws.then(lq.char(")"))
        .bind(function (l) {
          return lq.pure(u + r + l);
        });
    });
  })
  .label("url token");

var numberToken = lq.option("", lq.oneOf("+-"))
  .bind(function(n) {
    return lq.choice([
      digits.bind(function(i) {
        return lq.char(".").bind(function(t) {
          return digits.bind(function(g) {
            return lq.pure(i + t + g);
          });
        });
      }).try(),
      digits,
      lq.char(".").bind(function(i) {
        return digits.bind(function(t) {
          return lq.pure(i + t);
        });
      }).try()
    ]).bind(function(m) {
      return lq.option("",
        lq.oneOf("eE").bind(function(p) {
          return lq.option("", lq.oneOf("+-"))
            .bind(function(o) {
              return digits.bind(function(w) {
                return lq.pure(p + o + w);
              });
            });
        })
      ).bind(function(b) {
          return lq.pure(n + m + b);
        });
    });
  })
  .label("number token")
  .try();

var dimensionToken = numberToken
  .bind(function(d) {
    return identToken.bind(function(m) {
      return lq.pure(d + m);
    })
  })
  .label("dimension token")
  .try();

var percentageToken = numberToken
  .bind(function(p) {
    return lq.char("%").bind(function(c) {
      return lq.pure(p + c);
    })
  })
  .label("percentage token")
  .try();

var includeMatchToken   = lq.string("~=").try();
var dashMatchToken      = lq.string("|=").try();
var prefixMatchToken    = lq.string("^=").try();
var suffixMatchToken    = lq.string("$=").try();
var substringMatchToken = lq.string("*=").try();
var columnToken         = lq.string("||").try();
var CDOToken            = lq.string("<!--").try();
var CDCToken            = lq.string("-->").try();

var openParenToken    = lq.char("(");
var closeParenToken   = lq.char(")");
var openBraceToken    = lq.char("{");
var closeBraceToken   = lq.char("}");
var openBracketToken  = lq.char("[");
var closeBracketToken = lq.char("]");
var commaToken        = lq.char(",");
var semicolonToken    = lq.char(";");
var colonToken        = lq.char(":");

var delimToken = lq.oneOf("!#$%-=~^|\\@+*.<>/?");

var token = lq.choice([
  urlToken,
  functionToken,
  identToken,
  atKeywordToken,
  hashToken,
  stringToken,
  dimensionToken,
  percentageToken,
  numberToken,
  includeMatchToken,
  dashMatchToken,
  prefixMatchToken,
  suffixMatchToken,
  substringMatchToken,
  columnToken,
  CDOToken,
  CDCToken,
  colonToken,
  semicolonToken,
  commaToken,
  openBracketToken,
  closeBracketToken,
  openParenToken,
  closeParenToken,
  openBraceToken,
  closeBraceToken,
  delimToken
]).label("token");

var css = tokenParser.whiteSpace
  .then(token.sepEndBy(tokenParser.whiteSpace));

/* */

module.exports = css;