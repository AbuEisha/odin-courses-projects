import Tree from "./binarySearchTrees.js";

const randomArray = generateRandomArray(7);

const tree = new Tree(randomArray);

console.log(tree.isBalanced());

console.log("Level Order");

tree.levelOrderForEach((val) => console.log(val));

console.log("Pre Order");

tree.preOrderForEach((val) => console.log(val));

console.log("Post Order");

tree.postOrderForEach((val) => console.log(val));

console.log("In Order");

tree.inOrderForEach((val) => console.log(val));

tree.insert(25);
tree.insert(30);
tree.insert(40);

console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());

console.log("Level Order");

tree.levelOrderForEach((val) => console.log(val));

console.log("Pre Order");

tree.preOrderForEach((val) => console.log(val));

console.log("Post Order");

tree.postOrderForEach((val) => console.log(val));

console.log("In Order");

tree.inOrderForEach((val) => console.log(val));

function generateRandomArray(size) {
  let arr = [];
  for (let i = 0; i < size; i++) {
    const randomNum = Math.floor(Math.random() * 100);
    arr.push(randomNum);
  }
  return arr;
}
