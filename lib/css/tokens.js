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
  }
  IncludeMatchToken.prototype.toString = function () {
    return "IncludeMatchToken";
  };
  return IncludeMatchToken;
})(Token);

var DashMatchToken = (function(parent) {
  function DashMatchToken(pos) {
    parent.call(this, pos);
  }
  DashMatchToken.prototype.toString = function () {
    return "DashMatchToken";
  };
  return DashMatchToken;
})(Token);

var PrefixMatchToken = (function(parent) {
  function PrefixMatchToken(pos) {
    parent.call(this, pos);
  }
  PrefixMatchToken.prototype.toString = function () {
    return "PrefixMatchToken";
  };
  return PrefixMatchToken;
})(Token);

var SuffixMatchToken = (function(parent) {
  function SuffixMatchToken(pos) {
    parent.call(this, pos);
  }
  SuffixMatchToken.prototype.toString = function () {
    return "SuffixMatchToken";
  };
  return SuffixMatchToken;
})(Token);

var SubstringMatchToken = (function(parent) {
  function SubstringMatchToken(pos) {
    parent.call(this, pos);
  }
  SubstringMatchToken.prototype.toString = function () {
    return "SubstringMatchToken";
  };
  return SubstringMatchToken;
})(Token);

var ColumnToken = (function(parent) {
  function ColumnToken(pos) {
    parent.call(this, pos);
  }
  ColumnToken.prototype.toString = function () {
    return "ColumnToken";
  };
  return ColumnToken;
})(Token);

var WhitespaceToken = (function(parent) {
  function WhitespaceToken(pos) {
    parent.call(this, pos);
  }
  WhitespaceToken.prototype.toString = function () {
    return "WhitespaceToken";
  };
  return WhitespaceToken;
})(Token);

var CDOToken = (function(parent) {
  function CDOToken(pos) {
    parent.call(this, pos);
  }
  CDOToken.prototype.toString = function () {
    return "CDOToken";
  };
  return CDOToken;
})(Token);

var CDCToken = (function(parent) {
  function CDCToken(pos) {
    parent.call(this, pos);
  }
  CDCToken.prototype.toString = function () {
    return "CDCToken";
  };
  return CDCToken;
})(Token);

var ColonToken = (function(parent) {
  function ColonToken(pos) {
    parent.call(this, pos);
  }
  ColonToken.prototype.toString = function () {
    return "ColonToken";
  };
  return ColonToken;
})(Token);

var SemicolonToken = (function(parent) {
  function SemicolonToken(pos) {
    parent.call(this, pos);
  }
  SemicolonToken.prototype.toString = function () {
    return "SemicolonToken";
  };
  return SemicolonToken;
})(Token);

var CommaToken = (function(parent) {
  function CommaToken(pos) {
    parent.call(this, pos);
  }
  CommaToken.prototype.toString = function () {
    return "CommaToken";
  };
  return CommaToken;
})(Token);

var OpenBracketToken = (function(parent) {
  function OpenBracketToken(pos) {
    parent.call(this, pos);
  }
  OpenBracketToken.prototype.toString = function () {
    return "OpenBracketToken";
  };
  return OpenBracketToken;
})(Token);

var CloseBracketToken = (function(parent) {
  function CloseBracketToken(pos) {
    parent.call(this, pos);
  }
  CloseBracketToken.prototype.toString = function () {
    return "CloseBracketToken";
  };
  return CloseBracketToken;
})(Token);

var OpenParenToken = (function(parent) {
  function OpenParenToken(pos) {
    parent.call(this, pos);
  }
  OpenParenToken.prototype.toString = function () {
    return "OpenParenToken";
  };
  return OpenParenToken;
})(Token);

var CloseParenToken = (function(parent) {
  function CloseParenToken(pos) {
    parent.call(this, pos);
  }
  CloseParenToken.prototype.toString = function () {
    return "CloseParenToken";
  };
  return CloseParenToken;
})(Token);

var OpenBraceToken = (function(parent) {
  function OpenBraceToken(pos) {
    parent.call(this, pos);
  }
  OpenBraceToken.prototype.toString = function () {
    return "OpenBraceToken";
  };
  return OpenBraceToken;
})(Token);

var CloseBraceToken = (function(parent) {
  function CloseBraceToken(pos) {
    parent.call(this, pos);
  }
  CloseBraceToken.prototype.toString = function () {
    return "CloseBraceToken";
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