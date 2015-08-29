/*
 *  ref: http://www.w3.org/TR/css-syntax-3/
 */

"use strict";

var lq = require("loquat");
var tokens = require("./tokens.js");
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

var identParser = lq.option("", lq.char("-"))
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
  .try();
var identToken = lq.getPosition
  .bind(function(pos) {
    return identParser.bind(function(v) {
      return lq.pure(new tokens.IdentToken(pos, v));
    });
  })
  .label("ident token");

var functionParser = identParser
  .bind(function(f) {
    return lq.char("(").bind(function(n) {
      return lq.pure(f + n);
    })
  })
  .try();
var functionToken = lq.getPosition
  .bind(function(pos) {
    return functionParser.bind(function(v) {
      return lq.pure(new tokens.FunctionToken(pos, v));
    });
  })
  .label("function token");

var atKeywordParser = lq.char("@")
  .bind(function(a) {
    return identParser.bind(function(t) {
      return lq.pure(a + t);
    })
  })
  .try();
var atKeywordToken = lq.getPosition
  .bind(function(pos) {
    return atKeywordParser.bind(function(v) {
      return lq.pure(new tokens.AtKeywordToken(pos, v));
    });
  })
  .label("at keyword token");

var hashParser = lq.char("#")
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
  .try();
var hashToken = lq.getPosition
  .bind(function(pos) {
    return hashParser.bind(function(v) {
      return lq.pure(new tokens.HashToken(pos, v));
    });
  })
  .label("hash token");

var stringParser = lq.choice([
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
]);
var stringToken = lq.getPosition
  .bind(function(pos) {
    return stringParser.bind(function(v) {
      return lq.pure(new tokens.StringToken(pos, v));
    });
  })
  .label("string token");

var urlUnquoted = lq.notFollowedBy(lq.choice([
  lq.oneOf("\"'()\\"),
  whitespace,
  nonPrintable
])).then(lq.anyChar).manyChar1();

var urlParser = lq.string("url(")
  .try()
  .bind(function(u) {
    return ws.then(lq.option("",
      lq.choice([
        urlUnquoted,
        stringParser
      ])
    )).bind(function (r) {
      return ws.then(lq.char(")"))
        .bind(function (l) {
          return lq.pure(u + r + l);
        });
    });
  });
var urlToken = lq.getPosition
  .bind(function(pos) {
    return urlParser.bind(function(v) {
      return lq.pure(new tokens.UrlToken(pos, v));
    });
  })
  .label("url token");

var numberParser = lq.option("", lq.oneOf("+-"))
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
  .try();
var numberToken = lq.getPosition
  .bind(function(pos) {
    return numberParser.bind(function(v) {
      return lq.pure(new tokens.NumberToken(pos, v));
    });
  })
  .label("number token");

var dimensionParser = numberParser
  .bind(function(d) {
    return identParser.bind(function(m) {
      return lq.pure(d + m);
    })
  })
  .try();
var dimensionToken = lq.getPosition
  .bind(function(pos) {
    return dimensionParser.bind(function(v) {
      return lq.pure(new tokens.DimensionToken(pos, v));
    });
  })
  .label("dimension token");

var percentageParser = numberParser
  .bind(function(p) {
    return lq.char("%").bind(function(c) {
      return lq.pure(p + c);
    })
  })
  .try();
var percentageToken = lq.getPosition
  .bind(function(pos) {
    return percentageParser.bind(function(v) {
      return lq.pure(new tokens.PercentageToken(pos, v));
    });
  })
  .label("percentage token");

var symbol = function(parser, tok) {
  return lq.getPosition.bind(function(pos) {
    return parser.bind(function(d) {
      return lq.pure(new tok(pos));
    });
  });
};

var includeMatchToken   = symbol(lq.string("~=").try(), tokens.IncludeMatchToken);
var dashMatchToken      = symbol(lq.string("|=").try(), tokens.DashMatchToken);
var prefixMatchToken    = symbol(lq.string("^=").try(), tokens.PrefixMatchToken);
var suffixMatchToken    = symbol(lq.string("$=").try(), tokens.SuffixMatchToken);
var substringMatchToken = symbol(lq.string("*=").try(), tokens.SubstringMatchToken);
var columnToken         = symbol(lq.string("||").try(), tokens.ColumnToken);
var CDOToken            = symbol(lq.string("<!--").try(), tokens.CDOToken);
var CDCToken            = symbol(lq.string("-->").try(), tokens.CDCToken);

var openParenToken    = symbol(lq.char("("), tokens.OpenParenToken);
var closeParenToken   = symbol(lq.char(")"), tokens.CloseParenToken);
var openBraceToken    = symbol(lq.char("{"), tokens.OpenBraceToken);
var closeBraceToken   = symbol(lq.char("}"), tokens.CloseParenToken);
var openBracketToken  = symbol(lq.char("["), tokens.OpenBracketToken);
var closeBracketToken = symbol(lq.char("]"), tokens.CloseBracketToken);
var commaToken        = symbol(lq.char(","), tokens.CommaToken);
var semicolonToken    = symbol(lq.char(";"), tokens.SemicolonToken);
var colonToken        = symbol(lq.char(":"), tokens.ColonToken);

var delimToken = lq.getPosition.bind(function(pos) {
  return lq.oneOf("!#$%-=~^|\\@+*.<>/?").bind(function(d) {
    return lq.pure(new tokens.DelimToken(pos, d));
  });
});

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