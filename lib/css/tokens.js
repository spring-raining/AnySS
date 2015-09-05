"use strict";

var Token = (function () {
  function Token(pos) {
    this.pos = pos;
  }
  return Token;
})();

var IdentToken = (function(parent) {
  function IdentToken(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  IdentToken.prototype.toString = function () {
    return "IdentToken: " + this.value;
  };
  return IdentToken;
})(Token);

var FunctionToken = (function(parent) {
  function FunctionToken(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  FunctionToken.prototype.toString = function () {
    return "FunctionToken: " + this.value;
  };
  return FunctionToken;
})(Token);

var AtKeywordToken = (function(parent) {
  function AtKeywordToken(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  AtKeywordToken.prototype.toString = function () {
    return "AtKeywordToken: " + this.value;
  };
  return AtKeywordToken;
})(Token);

var HashToken = (function(parent) {
  function HashToken(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  HashToken.prototype.toString = function () {
    return "HashToken: " + this.value;
  };
  return HashToken;
})(Token);

var StringToken = (function(parent) {
  function StringToken(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  StringToken.prototype.toString = function () {
    return "StringToken: " + this.value;
  };
  return StringToken;
})(Token);

var UrlToken = (function(parent) {
  function UrlToken(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  UrlToken.prototype.toString = function () {
    return "UrlToken: " + this.value;
  };
  return UrlToken;
})(Token);

var DelimToken = (function(parent) {
  function DelimToken(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  DelimToken.prototype.toString = function () {
    return "DelimToken: " + this.value;
  };
  return DelimToken;
})(Token);

var NumberToken = (function(parent) {
  function NumberToken(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  NumberToken.prototype.toString = function () {
    return "NumberToken: " + this.value;
  };
  return NumberToken;
})(Token);

var PercentageToken = (function(parent) {
  function PercentageToken(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  PercentageToken.prototype.toString = function () {
    return "PercentageToken: " + this.value;
  };
  return PercentageToken;
})(Token);

var DimensionToken = (function(parent) {
  function DimensionToken(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  DimensionToken.prototype.toString = function () {
    return "DimensionToken: " + this.value;
  };
  return DimensionToken;
})(Token);

var UnicodeRangeToken = (function(parent) {
  function UnicodeRangeToken(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  UnicodeRangeToken.prototype.toString = function () {
    return "UnicodeRangeToken: " + this.value;
  };
  return UnicodeRangeToken;
})(Token);

var IncludeMatchToken = (function(parent) {
  function IncludeMatchToken(pos) {
    parent.call(this, pos);
    this.value = "~="
  }
  IncludeMatchToken.prototype.toString = function () {
    return "IncludeMatchToken: " + this.value;
  };
  return IncludeMatchToken;
})(Token);

var DashMatchToken = (function(parent) {
  function DashMatchToken(pos) {
    parent.call(this, pos);
    this.value = "|="
  }
  DashMatchToken.prototype.toString = function () {
    return "DashMatchToken: " + this.value;
  };
  return DashMatchToken;
})(Token);

var PrefixMatchToken = (function(parent) {
  function PrefixMatchToken(pos) {
    parent.call(this, pos);
    this.value = "^="
  }
  PrefixMatchToken.prototype.toString = function () {
    return "PrefixMatchToken: " + this.value;
  };
  return PrefixMatchToken;
})(Token);

var SuffixMatchToken = (function(parent) {
  function SuffixMatchToken(pos) {
    parent.call(this, pos);
    this.value = "$=";
  }
  SuffixMatchToken.prototype.toString = function () {
    return "SuffixMatchToken: " + this.value;
  };
  return SuffixMatchToken;
})(Token);

var SubstringMatchToken = (function(parent) {
  function SubstringMatchToken(pos) {
    parent.call(this, pos);
    this.value = "*=";
  }
  SubstringMatchToken.prototype.toString = function () {
    return "SubstringMatchToken: " + this.value;
  };
  return SubstringMatchToken;
})(Token);

var ColumnToken = (function(parent) {
  function ColumnToken(pos) {
    parent.call(this, pos);
    this.value = "||";
  }
  ColumnToken.prototype.toString = function () {
    return "ColumnToken: " + this.value;
  };
  return ColumnToken;
})(Token);

var WhitespaceToken = (function(parent) {
  function WhitespaceToken(pos) {
    parent.call(this, pos);
  }
  WhitespaceToken.prototype.toString = function () {
    return "WhitespaceToken: " + this.value;
  };
  return WhitespaceToken;
})(Token);

var CDOToken = (function(parent) {
  function CDOToken(pos) {
    parent.call(this, pos);
    this.value = "<!--";
  }
  CDOToken.prototype.toString = function () {
    return "CDOToken: " + this.value;
  };
  return CDOToken;
})(Token);

var CDCToken = (function(parent) {
  function CDCToken(pos) {
    parent.call(this, pos);
    this.value = "-->";
  }
  CDCToken.prototype.toString = function () {
    return "CDCToken: " + this.value;
  };
  return CDCToken;
})(Token);

var ColonToken = (function(parent) {
  function ColonToken(pos) {
    parent.call(this, pos);
    this.value = ":";
  }
  ColonToken.prototype.toString = function () {
    return "ColonToken: " + this.value;
  };
  return ColonToken;
})(Token);

var SemicolonToken = (function(parent) {
  function SemicolonToken(pos) {
    parent.call(this, pos);
    this.value = ";";
  }
  SemicolonToken.prototype.toString = function () {
    return "SemicolonToken: " + this.value;
  };
  return SemicolonToken;
})(Token);

var CommaToken = (function(parent) {
  function CommaToken(pos) {
    parent.call(this, pos);
    this.value = ",";
  }
  CommaToken.prototype.toString = function () {
    return "CommaToken: " + this.value;
  };
  return CommaToken;
})(Token);

var OpenBracketToken = (function(parent) {
  function OpenBracketToken(pos) {
    parent.call(this, pos);
    this.value = "[";
  }
  OpenBracketToken.prototype.toString = function () {
    return "OpenBracketToken: " + this.value;
  };
  return OpenBracketToken;
})(Token);

var CloseBracketToken = (function(parent) {
  function CloseBracketToken(pos) {
    parent.call(this, pos);
    this.value = "]";
  }
  CloseBracketToken.prototype.toString = function () {
    return "CloseBracketToken: " + this.value;
  };
  return CloseBracketToken;
})(Token);

var OpenParenToken = (function(parent) {
  function OpenParenToken(pos) {
    parent.call(this, pos);
    this.value = "(";
  }
  OpenParenToken.prototype.toString = function () {
    return "OpenParenToken: " + this.value;
  };
  return OpenParenToken;
})(Token);

var CloseParenToken = (function(parent) {
  function CloseParenToken(pos) {
    parent.call(this, pos);
    this.value = ")";
  }
  CloseParenToken.prototype.toString = function () {
    return "CloseParenToken: " + this.value;
  };
  return CloseParenToken;
})(Token);

var OpenBraceToken = (function(parent) {
  function OpenBraceToken(pos) {
    parent.call(this, pos);
    this.value = "{";
  }
  OpenBraceToken.prototype.toString = function () {
    return "OpenBraceToken: " + this.value;
  };
  return OpenBraceToken;
})(Token);

var CloseBraceToken = (function(parent) {
  function CloseBraceToken(pos) {
    parent.call(this, pos);
    this.value = "}";
  }
  CloseBraceToken.prototype.toString = function () {
    return "CloseBraceToken: " + this.value;
  };
  return CloseBraceToken;
})(Token);

module.exports = {
  IdentToken:           IdentToken,
  FunctionToken:        FunctionToken,
  AtKeywordToken:       AtKeywordToken,
  HashToken:            HashToken,
  StringToken:          StringToken,
  UrlToken:             UrlToken,
  DelimToken:           DelimToken,
  NumberToken:          NumberToken,
  PercentageToken:      PercentageToken,
  DimensionToken:       DimensionToken,
  UnicodeRangeToken:    UnicodeRangeToken,
  IncludeMatchToken:    IncludeMatchToken,
  DashMatchToken:       DashMatchToken,
  PrefixMatchToken:     PrefixMatchToken,
  SuffixMatchToken:     SuffixMatchToken,
  SubstringMatchToken:  SubstringMatchToken,
  ColumnToken:          ColumnToken,
  WhitespaceToken:      WhitespaceToken,
  CDOToken:             CDOToken,
  CDCToken:             CDCToken,
  ColonToken:           ColonToken,
  SemicolonToken:       SemicolonToken,
  CommaToken:           CommaToken,
  OpenBracketToken:     OpenBracketToken,
  CloseBracketToken:    CloseBracketToken,
  OpenParenToken:       OpenParenToken,
  CloseParenToken:      CloseParenToken,
  OpenBraceToken:       OpenBraceToken,
  CloseBraceToken:      CloseBraceToken
};