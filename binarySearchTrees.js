class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

/**
 * Tree factory/class. On init, builds a balanced BST from `values`.
 */
export default class Tree {
  constructor(values) {
    this.root = this.buildTree(values);
  }

  buildTree(values) {
    if (!Array.isArray(values) || values.length === 0) {
      return null;
    }

    // Sort and dedupe
    const sorted = Array.from(new Set(values)).sort((a, b) => a - b);

    // Recursive helper: build subtree from indices [l..r]

    return this._buildSubtree(sorted, 0, sorted.length - 1);
  }

  _buildSubtree(arr, left, right) {
    if (left > right) return null;

    const mid = Math.floor((left + right) / 2);
    const node = new Node(arr[mid]);

    node.left = this._buildSubtree(arr, left, mid - 1);
    node.right = this._buildSubtree(arr, mid + 1, right);

    return node;
  }

  prettyPrint() {
    const visualize = (node, prefix = "", isLeft = true) => {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        visualize(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        visualize(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    };

    visualize(this.root);
  }

  // Public: insert a value into the tree
  insert(value) {
    this.root = this._insert(this.root, value);
  }

  // Insert helper
  _insert(node, value) {
    if (!node) {
      return new Node(value);
    }

    if (value < node.data) {
      node.left = this._insert(node.left, value);
    } else if (value > node.data) {
      node.right = this._insert(node.right, value);
    }

    return node;
  }

  // Public: delete a value from the tree
  deleteItem(value) {
    this.root = this._delete(this.root, value);
  }

  // Delete
  _delete(node, value) {
    if (!node) return null;

    if (value < node.data) {
      node.left = this._delete(node.left, value);
    } else if (value > node.data) {
      node.right = this._delete(node.right, value);
    } else {
      // found node to remove
      if (!node.left || !node.right) {
        node = node.left || node.right;
      } else {
        // two children: swap with in-order successor
        const succ = this._minNode(node.right);
        node.data = succ.data;
        node.right = this._delete(node.right, succ.data);
      }
    }
    return node;
  }

  // Find minimum node in subtree
  _minNode(node) {
    while (node.left) node = node.left;
    return node;
  }

  /**
   * Find and return the node with given value, or null if not found.
   */
  find(value) {
    return this._find(this.root, value);
  }

  _find(node, value) {
    if (!node) return null;
    if (value === node.data) {
      return node;
    } else if (value < node.data) {
      return this._find(node.left, value);
    } else {
      return this._find(node.right, value);
    }
  }

  // Traverse the tree in level-order and call `callback` on each node's value.
  levelOrderForEach(callback) {
    if (typeof callback !== "function" || !this.root)
      throw new Error(
        "Callback must be a function and tree must not be empty."
      );

    const queue = [this.root];

    while (queue.length) {
      const node = queue.shift();
      callback(node.data);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  // In-order:   left → node → right
  inOrderForEach(callback) {
    if (typeof callback !== "function" || !this.root)
      throw new Error(
        "Callback must be a function and tree must not be empty."
      );

    (function dfs(node) {
      if (!node) return;
      dfs(node.left);
      callback(node.data);
      dfs(node.right);
    })(this.root);
  }

  // Pre-order:  node → left → right
  preOrderForEach(callback) {
    if (typeof callback !== "function" || !this.root)
      throw new Error(
        "Callback must be a function and tree must not be empty."
      );

    (function dfs(node) {
      if (!node) return;
      callback(node.data);
      dfs(node.left);
      dfs(node.right);
    })(this.root);
  }

  // Post-order: left → right → node
  postOrderForEach(callback) {
    if (typeof callback !== "function" || !this.root)
      throw new Error(
        "Callback must be a function and tree must not be empty."
      );

    (function dfs(node) {
      if (!node) return;
      dfs(node.left);
      dfs(node.right);
      callback(node.data);
    })(this.root);
  }

  /**
   * Returns the height of the node containing `value`.
   * Height is the number of edges on the longest path
   * from that node down to a leaf (leaf → 0).
   */
  height(value) {
    const node = this.find(value);
    if (!node) return null;
    return this._getHeight(node);
  }

  // Recursively get height of a subtree rooted at `node`.
  _getHeight(node) {
    if (!node) return null;
    const leftH = this._getHeight(node.left);
    const rightH = this._getHeight(node.right);
    return 1 + Math.max(leftH, rightH);
  }

  /**
   * Returns the depth of the node containing `value`.
   * Depth is the number of edges from the root to that node.
   */
  depth(value) {
    let node = this.root;
    let depth = 0;

    while (node) {
      if (value === node.data) {
        return depth;
      }

      node = value < node.data ? node.left : node.right;

      depth++;
    }

    return null;
  }

  /**
   * Checks if the entire tree is height-balanced.
   * A tree is balanced if for every node:
   * |height(left) - height(right)| ≤ 1
   */
  isBalanced() {
    return this._checkBalance(this.root) !== -1;
  }

  /**
   * Recursively checks balance and returns height.
   * If any subtree is unbalanced, returns -1 immediately.
   */
  _checkBalance(node) {
    if (!node) return 0;

    const leftHeight = this._checkBalance(node.left);
    const rightHeight = this._checkBalance(node.right);

    if (leftHeight === -1 || rightHeight === -1) return -1;
    if (Math.abs(leftHeight - rightHeight) > 1) return -1;

    return 1 + Math.max(leftHeight, rightHeight);
  }

  rebalance() {
    const values = [];
    this._collectValues(this.root, values);
    values.sort((a, b) => a - b); // ensure ascending order
    this.root = this._buildSubtree(values, 0, values.length - 1);
  }

  // Helper: collect all node values (any traversal works — here we use pre-order)
  _collectValues(node, arr) {
    if (!node) return;
    arr.push(node.data);
    this._collectValues(node.left, arr);
    this._collectValues(node.right, arr);
  }
}
