import HashMap from "./hashMap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("moon", "silver");
test.set("kite", "rainbow");
console.log(test.get("kite"));
console.log(test.get("dog"));
console.log(test.has("jacket"));
console.log(test.has("doge"));
console.log(test.remove("dog"));
console.log(test.length());
// test.clear();
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
