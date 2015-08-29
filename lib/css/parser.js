"use strict";

var lq = require("loquat");
var lexer = require("./lexer.js");

/*
function functionBlock() {
  return functionToken
    .then(componentValue().many());
}

function braceBlock() {
  return componentValue()
    .between(lq.char("{"), lq.char("}"));
}

function parenBlock() {
  return componentValue()
    .between(lq.char("("), lq.char(")"));
}

function bracketBlock() {
  return componentValue()
    .between(lq.char("["), lq.char("]"));
}

function componentValue() {
  return lq.choice([
    preservedToken(),
    braceBlock(),
    parenBlock(),
    bracketBlock(),
    functionBlock()
  ]);
}

function important() {
  return lq.char("!")
    .then(ws)
    .then(lq.string("important"))
    .then(ws);
}

function declaration() {
  return identToken
    .then(ws)
    .then(lq.token(":"))
    .then(componentValue().many())
    .then(lq.optional(important()));
}

function qualifiedRule() {
  return componentValue().many().then(braceBlock);
}

function atRule() {
  return atKeywordToken
    .then(componentValue().many())
    .then(lq.choice([
      braceBlock(),
      lq.char(";")
    ]));
}

var stylesheet = lq.choice([
  CDOToken,
  CDCToken,
  whitespaceToken,
  qualifiedRule(),
  atRule()
]).many();
*/

var source =
  ' @import "manual.css";\n' +
  '\n' +
  '@font-face {\n' +
  '    font-family: DroidSans;\n' +
  '    src: url("DroidSans.ttf");\n' +
  '    unicode-range: U+000-5FF, U+1e00-1fff, U+2000-2300;\n' +
  '}\n' +
  'h1.mystyle:lang(en) {\n' +
  '    color:blue; border:rgb(255,0,0); /* TODO: change THIS to yellow for next version! */\n' +
  '    -m-background-color: #FAFAFA;\n' +
  '    background:url(hello.jpg) !important;\n' +
  '}\n' +
  'div > p, p ~ ul, input[type~="radio"] {\n' +
  '    color: green;\n' +
  '    width: 80%;\n' +
  '}\n' +
  '#header:after {\n' +
  '    color: red;\n' +
  '} ';

var result = lq.parse(lexer, "name", source);
if (result.succeeded) {
  result.value.forEach(function(e) {
    console.log(e.toString());
  });
}
else {
  console.log(result.error.toString());
}