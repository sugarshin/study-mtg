"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var a = [];
var B = 2;

var func = function func(message) {
  alert(message);
};

exports["default"] = B;
var C = 3;

exports.C = C;
var person = {
  _name: "sato",
  show: function show() {
    console.log(this._name);
  }
};

var bob = {
  _name: "Bob",
  _friends: [],
  printFriends: function printFriends() {
    var _this = this;

    this._friends.forEach(function (f) {
      return console.log(_this._name + " knows " + f);
    });
  }
};

person.show();
