"use strict";

var Token = (function () {
  function Token(pos) {
    this.pos = pos;
  }
  return Token;
})();

var IdentToken = (function(parent) {
  function T(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  T.prototype.toString = function () {
    return "IdentToken: " + this.value;
  };
  return T;
})(Token);

var FunctionToken = (function(parent) {
  function T(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  T.prototype.toString = function () {
    return "FunctionToken: " + this.value;
  };
  return T;
})(Token);

var AtKeywordToken = (function(parent) {
  function T(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  T.prototype.toString = function () {
    return "AtKeywordToken: " + this.value;
  };
  return T;
})(Token);

var HashToken = (function(parent) {
  function T(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  T.prototype.toString = function () {
    return "HashToken: " + this.value;
  };
  return T;
})(Token);

var StringToken = (function(parent) {
  function T(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  T.prototype.toString = function () {
    return "StringToken: " + this.value;
  };
  return T;
})(Token);

var UrlToken = (function(parent) {
  function T(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  T.prototype.toString = function () {
    return "UrlToken: " + this.value;
  };
  return T;
})(Token);

var DelimToken = (function(parent) {
  function T(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  T.prototype.toString = function () {
    return "DelimToken: " + this.value;
  };
  return T;
})(Token);

var NumberToken = (function(parent) {
  function T(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  T.prototype.toString = function () {
    return "NumberToken: " + this.value;
  };
  return T;
})(Token);

var PercentageToken = (function(parent) {
  function T(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  T.prototype.toString = function () {
    return "PercentageToken: " + this.value;
  };
  return T;
})(Token);

var DimensionToken = (function(parent) {
  function T(pos, value) {
    parent.call(this, pos);
    this.value = value;
  }
  T.prototype.toString = function () {
    return "DimensionToken: " + this.value;
  };
  return T;
})(Token);

var IncludeMatchToken = (function(parent) {
  function T(pos) {
    parent.call(this, pos);
  }
  T.prototype.toString = function () {
    return "IncludeMatchToken";
  };
  return T;
})(Token);

var DashMatchToken = (function(parent) {
  function T(pos) {
    parent.call(this, pos);
  }
  T.prototype.toString = function () {
    return "DashMatchToken";
  };
  return T;
})(Token);

var PrefixMatchToken = (function(parent) {
  function T(pos) {
    parent.call(this, pos);
  }
  T.prototype.toString = function () {
    return "PrefixMatchToken";
  };
  return T;
})(Token);

var SuffixMatchToken = (function(parent) {
  function T(pos) {
    parent.call(this, pos);
  }
  T.prototype.toString = function () {
    return "SuffixMatchToken";
  };
  return T;
})(Token);

var SubstringMatchToken = (function(parent) {
  function T(pos) {
    parent.call(this, pos);
  }
  T.prototype.toString = function () {
    return "SubstringMatchToken";
  };
  return T;
})(Token);

var ColumnToken = (function(parent) {
  function T(pos) {
    parent.call(this, pos);
  }
  T.prototype.toString = function () {
    return "ColumnToken";
  };
  return T;
})(Token);

var WhitespaceToken = (function(parent) {
  function T(pos) {
    parent.call(this, pos);
  }
  T.prototype.toString = function () {
    return "WhitespaceToken";
  };
  return T;
})(Token);

var CDOToken = (function(parent) {
  function T(pos) {
    parent.call(this, pos);
  }
  T.prototype.toString = function () {
    return "CDOToken";
  };
  return T;
})(Token);

var CDCToken = (function(parent) {
  function T(pos) {
    parent.call(this, pos);
  }
  T.prototype.toString = function () {
    return "CDCToken";
  };
  return T;
})(Token);

var ColonToken = (function(parent) {
  function T(pos) {
    parent.call(this, pos);
  }
  T.prototype.toString = function () {
    return "ColonToken";
  };
  return T;
})(Token);

var SemicolonToken = (function(parent) {
  function T(pos) {
    parent.call(this, pos);
  }
  T.prototype.toString = function () {
    return "SemicolonToken";
  };
  return T;
})(Token);

var CommaToken = (function(parent) {
  function T(pos) {
    parent.call(this, pos);
  }
  T.prototype.toString = function () {
    return "CommaToken";
  };
  return T;
})(Token);

var OpenBracketToken = (function(parent) {
  function T(pos) {
    parent.call(this, pos);
  }
  T.prototype.toString = function () {
    return "OpenBracketToken";
  };
  return T;
})(Token);

var CloseBracketToken = (function(parent) {
  function T(pos) {
    parent.call(this, pos);
  }
  T.prototype.toString = function () {
    return "CloseBracketToken";
  };
  return T;
})(Token);

var OpenParenToken = (function(parent) {
  function T(pos) {
    parent.call(this, pos);
  }
  T.prototype.toString = function () {
    return "OpenParenToken";
  };
  return T;
})(Token);

var CloseParenToken = (function(parent) {
  function T(pos) {
    parent.call(this, pos);
  }
  T.prototype.toString = function () {
    return "CloseParenToken";
  };
  return T;
})(Token);

var OpenBraceToken = (function(parent) {
  function T(pos) {
    parent.call(this, pos);
  }
  T.prototype.toString = function () {
    return "OpenBraceToken";
  };
  return T;
})(Token);

var CloseBraceToken = (function(parent) {
  function T(pos) {
    parent.call(this, pos);
  }
  T.prototype.toString = function () {
    return "CloseBraceToken";
  };
  return T;
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