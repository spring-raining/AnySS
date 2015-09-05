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
  function Stylesheet(pos, styles) {
    parent.call(this, pos);
    this.styles = styles;
  }
  Stylesheet.prototype.toString = function() {
    return "StyleSheet\n"
        + this.styles.map(function(e) {
          return prettify(e);
        }).join("\n");
  };
  return Stylesheet;
})(Rule);

var RuleList = (function(parent) {
  function RuleList(pos, rules) {
    parent.call(this, pos);
    this.rules = rules;
  }
  RuleList.prototype.toString = function() {
    return "RuleList\n"
        + this.rules.map(function(e) {
          return prettify(e);
        }).join("\n");
  };
  return RuleList;
})(Rule);

var AtRule = (function(parent) {
  function AtRule(pos, atKeywordToken, componentValues, tail) {
    parent.call(this, pos);
    this.atKeywordToken = atKeywordToken;
    this.componentValues = componentValues;
    this.tail = tail;
  }
  AtRule.prototype.toString = function() {
    return "AtRule\n"
        + prettify(this.atKeywordToken) + "\n"
        + this.componentValues.map(function(e) {
          return prettify(e);
        }).join("\n") + "\n"
        + prettify(this.tail);
  };
  return AtRule;
})(Rule);

var QualifiedRule = (function(parent) {
  function QualifiedRule(pos, componentValues, braceBlock) {
    parent.call(this, pos);
    this.componentValues = componentValues;
    this.braceBlock = braceBlock;
  }
  QualifiedRule.prototype.toString = function() {
    return "QualifiedRule\n"
        + this.componentValues.map(function(e) {
          return prettify(e);
        }).join("\n") + "\n"
        + prettify(this.braceBlock);
  };
  return QualifiedRule;
})(Rule);

var DeclarationList = (function(parent) {
  function DeclarationList(pos, declarations) {
    parent.call(this, pos);
    this.declarations = declarations;
  }
  DeclarationList.prototype.toString = function() {
    return "DeclarationList\n"
        + this.declarations.map(function(e) {
          return prettify(e);
        }).join("\n");
  };
  return DeclarationList;
})(Rule);

var Declaration = (function(parent) {
  function Declaration(pos, identToken, colonToken, componentValues, important) {
    parent.call(this, pos);
    this.identToken = identToken;
    this.colonToken = colonToken;
    this.componentValues = componentValues;
    this.important = important;
  }
  Declaration.prototype.toString = function() {
    return "Declaration\n"
        + prettify(this.identToken) + "\n"
        + prettify(this.colonToken) + "\n"
        + this.componentValues.map(function(e) {
          return prettify(e);
        }).join("\n")
        + (this.important? ("\n" + prettify(this.important)) : "");
  };
  return Declaration;
})(Rule);

var Important = (function(parent) {
  function Important(pos, excToken, identToken) {
    parent.call(this, pos);
    this.excToken = excToken;
    this.identToken = identToken;
  }
  Important.prototype.toString = function() {
    return "Important\n"
        + prettify(this.excToken) + "\n"
        + prettify(this.identToken);
  };
  return Important;
})(Rule);

var BraceBlock = (function(parent) {
  function BraceBlock(pos, openToken, componentValues, closeToken) {
    parent.call(this, pos);
    this.openToken = openToken;
    this.componentValues = componentValues;
    this.closeToken = closeToken;
  }
  BraceBlock.prototype.toString = function() {
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
  function ParenBlock(pos, openToken, componentValues, closeToken) {
    parent.call(this, pos);
    this.openToken = openToken;
    this.componentValues = componentValues;
    this.closeToken = closeToken;
  }
  ParenBlock.prototype.toString = function() {
    return "ParenBlock\n"
        + prettify(this.openToken) + "\n"
        + this.componentValues.map(function(e) {
          return prettify(e);
        }).join("\n") + "\n"
        + prettify(this.closeToken);
  };
  return ParenBlock;
})(Rule);

var BracketBlock = (function(parent) {
  function BracketBlock(pos, openToken, componentValues, closeToken) {
    parent.call(this, pos);
    this.openToken = openToken;
    this.componentValues = componentValues;
    this.closeToken = closeToken;
  }
  BracketBlock.prototype.toString = function() {
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
  function FunctionBlock(pos, functionToken, componentValues, closeToken) {
    parent.call(this, pos);
    this.functionToken = functionToken;
    this.componentValues = componentValues;
    this.closeToken = closeToken;
  }
  FunctionBlock.prototype.toString = function() {
    return "FunctionBlock\n"
        + prettify(this.functionToken) + "\n"
        + this.componentValues.map(function(e) {
          return prettify(e);
        }).join("\n") + "\n"
        + prettify(this.closeToken);
  };
  return FunctionBlock;
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