import React, { useState, useEffect } from "react";
import "./App.css";

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = this.prev = this.next = null;
  }
}

function Node({ value }) {
  return <div className="node">{value}</div>;
}

function Node1({ value }) {
  return <div className="node1">{value}</div>;
}

const convertToDoublyLinkedList = (root) => {
  if (!root) return null;

  let head = null;
  let prev = null;

  const inOrderTraversal = (node) => {
    if (!node) return;

    inOrderTraversal(node.left);

    // Modify the node to include prev and next pointers
    node.prev = prev;
    if (prev) {
      prev.next = node;
    } else {
      head = node;
    }

    prev = node;

    inOrderTraversal(node.right);
  };

  inOrderTraversal(root);

  return head;
};

const BinaryTreeToLinkedList = () => {
  const [tree, setTree] = useState(new TreeNode(1));
  const [doublyLinkedList, setDoublyLinkedList] = useState(null);

  useEffect(() => {
    // Create your binary tree here
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);

    setTree(root);
  }, []);

  const convertAndVisualize = () => {
    const doublyLinkedListHead = convertToDoublyLinkedList(tree);

    // Log the resulting doubly linked list
    let current = doublyLinkedListHead;
    setDoublyLinkedList(doublyLinkedListHead);
    while (current) {
      console.log(current.val);
      current = current.next;
    }
  };
  const renderDoublyLinkedList = (head) => {
    let current = head;
    const nodes = [];
    while (current) {
      nodes.push(<Node1 value={current.val} />);
      current = current.next;
    }
    return nodes;
  };
  function changebools() {
    setTree(tree);
    setDoublyLinkedList(null);
  }
  if (tree && !doublyLinkedList) {
    return (
      <div>
        <h2>Binary Tree to Doubly Linked List Visualization</h2>
        <div className="tree-container">{renderTree(tree)}</div>
        <button onClick={convertAndVisualize}>
          Convert to Doubly Linked List
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Binary Tree to Doubly Linked List Visualization</h2>
        <div className="doubly-linked-list">
          <div className="doubly-linked-list-head">Doubly Linked List Head</div>
          <div className="doubly-linked-list-nodes">
            {renderDoublyLinkedList(doublyLinkedList)}
          </div>
        </div>
        <button onClick={changebools}>Back to tree</button>
      </div>
    );
  }
};

const renderTree = (node) => {
  if (!node) return null;

  return (
    <div className="tree">
      <Node value={node.val} />

      <div className="tree-children">
        {renderTree(node.left)}
        {renderTree(node.right)}
      </div>
    </div>
  );
};
export default BinaryTreeToLinkedList;
