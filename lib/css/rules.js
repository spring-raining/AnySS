"use strict";

function prettify(val) {
  return "| " + val.toString().split("\n").join("\n| ");
}

var Rule = (function() {
  function Rule(pos) {
    this.pos = pos;
  }
  return Rule;
})();

var Stylesheet = (function(parent) {
  function R(pos, styles) {
    parent.call(this, pos);
    this.styles = styles;
  }
  R.prototype.toString = function() {
    return "StyleSheet\n"
        + this.styles.map(function(e) {
          return prettify(e);
        }).join("\n");
  };
  return R;
})(Rule);

var RuleList = (function(parent) {
  function R(pos, rules) {
    parent.call(this, pos);
    this.rules = rules;
  }
  R.prototype.toString = function() {
    return "RuleList\n"
        + this.rules.map(function(e) {
          return prettify(e);
        }).join("\n");
  };
  return R;
})(Rule);

var AtRule = (function(parent) {
  function R(pos, atKeywordToken, componentValues, tail) {
    parent.call(this, pos);
    this.atKeywordToken = atKeywordToken;
    this.componentValues = componentValues;
    this.tail = tail;
  }
  R.prototype.toString = function() {
    return "AtRule\n"
        + prettify(this.atKeywordToken) + "\n"
        + this.componentValues.map(function(e) {
          return prettify(e);
        }).join("\n") + "\n"
        + prettify(this.tail);
  };
  return R;
})(Rule);

var QualifiedRule = (function(parent) {
  function R(pos, componentValues, braceBlock) {
    parent.call(this, pos);
    this.componentValues = componentValues;
    this.braceBlock = braceBlock;
  }
  R.prototype.toString = function() {
    return "QualifiedRule\n"
        + this.componentValues.map(function(e) {
          return prettify(e);
        }).join("\n") + "\n"
        + prettify(this.braceBlock);
  };
  return R;
})(Rule);

var DeclarationList = (function(parent) {
  function R(pos, declarations) {
    parent.call(this, pos);
    this.declarations = declarations;
  }
  R.prototype.toString = function() {
    return "DeclarationList\n"
        + this.declarations.map(function(e) {
          return prettify(e);
        }).join("\n");
  };
  return R;
})(Rule);

var Declaration = (function(parent) {
  function R(pos, identToken, colonToken, componentValues, important) {
    parent.call(this, pos);
    this.identToken = identToken;
    this.colonToken = colonToken;
    this.componentValues = componentValues;
    this.important = important;
  }
  R.prototype.toString = function() {
    return "Declaration\n"
        + prettify(this.identToken) + "\n"
        + prettify(this.colonToken) + "\n"
        + this.componentValues.map(function(e) {
          return prettify(e);
        }).join("\n")
        + (this.important? ("\n" + prettify(this.important)) : "");
  };
  return R;
})(Rule);

var Important = (function(parent) {
  function R(pos, excToken, identToken) {
    parent.call(this, pos);
    this.excToken = excToken;
    this.identToken = identToken;
  }
  R.prototype.toString = function() {
    return "Important\n"
        + prettify(this.excToken) + "\n"
        + prettify(this.identToken);
  };
  return R;
})(Rule);

var BraceBlock = (function(parent) {
  function R(pos, openToken, componentValues, closeToken) {
    parent.call(this, pos);
    this.openToken = openToken;
    this.componentValues = componentValues;
    this.closeToken = closeToken;
  }
  R.prototype.toString = function() {
    return "BraceBlock\n"
        + prettify(this.openToken) + "\n"
        + this.componentValues.map(function(e) {
          return prettify(e);
        }).join("\n") + "\n"
        + prettify(this.closeToken);
  };
  return R;
})(Rule);

var ParenBlock = (function(parent) {
  function R(pos, openToken, componentValues, closeToken) {
    parent.call(this, pos);
    this.openToken = openToken;
    this.componentValues = componentValues;
    this.closeToken = closeToken;
  }
  R.prototype.toString = function() {
    return "ParenBlock\n"
        + prettify(this.openToken) + "\n"
        + this.componentValues.map(function(e) {
          return prettify(e);
        }).join("\n") + "\n"
        + prettify(this.closeToken);
  };
  return R;
})(Rule);

var BracketBlock = (function(parent) {
  function R(pos, openToken, componentValues, closeToken) {
    parent.call(this, pos);
    this.openToken = openToken;
    this.componentValues = componentValues;
    this.closeToken = closeToken;
  }
  R.prototype.toString = function() {
    return "BracketBlock\n"
        + prettify(this.openToken) + "\n"
        + this.componentValues.map(function(e) {
          return prettify(e);
        }).join("\n") + "\n"
        + prettify(this.closeToken);
  };
  return R;
})(Rule);

var FunctionBlock = (function(parent) {
  function R(pos, functionToken, componentValues, closeToken) {
    parent.call(this, pos);
    this.functionToken = functionToken;
    this.componentValues = componentValues;
    this.closeToken = closeToken;
  }
  R.prototype.toString = function() {
    return "FunctionBlock\n"
        + prettify(this.functionToken) + "\n"
        + this.componentValues.map(function(e) {
          return prettify(e);
        }).join("\n") + "\n"
        + prettify(this.closeToken);
  };
  return R;
})(Rule);

module.exports = {
  Stylesheet:       Stylesheet,
  RuleList:         RuleList,
  AtRule:           AtRule,
  QualifiedRule:    QualifiedRule,
  DeclarationList:  DeclarationList,
  Declaration:      Declaration,
  Important:        Important,
  BraceBlock:       BraceBlock,
  ParenBlock:       ParenBlock,
  BracketBlock:     BracketBlock,
  FunctionBlock:    FunctionBlock
};