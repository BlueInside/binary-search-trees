function node(d) {
  const data = d;
  const left = null;
  const right = null;
  return {
    data,
    left,
    right,
  };
}

function tree(arr) {
  let root;
  if (arr) {
    let array = removeDuplicates(arr);
    array = mergeSort(array);
    root = buildTree(array, 0, array.length - 1);
  } else {
    root = null;
  }
  function buildTree(arr, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const newNode = node(arr[mid]);
    newNode.left = buildTree(arr, start, mid - 1);
    newNode.right = buildTree(arr, mid + 1, end);
    return newNode;
  }
  function insert(value) {
    if (!Number(value)) return 'please enter a number';
    root = insertRec(value, root);
  }
  function insertRec(value, currentNode) {
    if (!currentNode) {
      currentNode = node(value);
      return currentNode;
    }
    if (value > currentNode.data)
      currentNode.right = insertRec(value, currentNode.right);
    if (value < currentNode.data)
      currentNode.left = insertRec(value, currentNode.left);
    return currentNode;
  }
  function deleteNode(value) {
    if (!Number(value)) return 'please enter a number';
    root = deleteNodeRec(value, root);
  }
  function deleteNodeRec(value, currentNode) {
    if (currentNode === null) {
      return currentNode;
    }
    if (value > currentNode.data) {
      currentNode.right = deleteNodeRec(value, currentNode.right);
      return currentNode;
    }
    if (value < currentNode.data) {
      currentNode.left = deleteNodeRec(value, currentNode.left);
      return currentNode;
    } else {
      if (currentNode.left === null) {
        return currentNode.right;
      } else if (currentNode.right === null) {
        return currentNode;
      } else {
        let parent = currentNode;
        let childBigger = currentNode.right;
        while (childBigger.left !== null) {
          parent = childBigger;
          childBigger = parent.left;
        }
        if (parent !== currentNode) {
          parent.left = childBigger.right;
          currentNode.data = childBigger.data;
          childBigger = null;
        } else {
          let temp = currentNode.left;
          currentNode = currentNode.right;
          currentNode.left = temp;
          temp = null;
        }
      }

      return currentNode;
    }
  }
  function find(value) {
    return findRec(value, root);
  }
  function findRec(value, currentNode) {
    if (currentNode === null) return currentNode;
    if (value > currentNode.data) {
      return findRec(value, currentNode.right);
    } else if (value < currentNode.data) {
      return findRec(value, currentNode.left);
    } else {
      return currentNode;
    }
  }
  function levelOrder(callback) {
    if (!callback) {
      const result = levelOrderRc(callback, root);
      return result;
    } else {
      levelOrder(callback, root);
    }
  }
  function levelOrderRc(callback, currentNode) {
    let result = [];
    if (currentNode === null) return;

    let queue = [];
    queue.push(currentNode);
    while (queue.length !== 0) {
      let current = queue.shift();

      if (!callback) {
        result.push(current.data);
      } else {
        callback(current);
      }
      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
    if (!callback) return result;
    return;
  }
  function preorder(callback, currentNode = root, result = []) {
    if (currentNode === null) return result;
    if (callback) {
      callback(currentNode);
    } else {
      result.push(currentNode.data);
    }
    result = preorder(callback, currentNode.left, result);
    result = preorder(callback, currentNode.right, result);
    if (!callback) return result;
  }
  // implement these
  function inorder(callback, currentNode = root, result = []) {
    if (currentNode === null) return result;

    result = inorder(callback, currentNode.left, result);

    if (callback) {
      callback(currentNode);
    } else {
      result.push(currentNode.data);
    }

    result = inorder(callback, currentNode.right, result);
    if (!callback) return result;
  }

  function postorder(callback, currentNode = root, result = []) {
    if (currentNode === null) return result;

    result = postorder(callback, currentNode.left, result);
    result = postorder(callback, currentNode.right, result);

    if (callback) {
      callback(currentNode);
    } else {
      result.push(currentNode.data);
      return result;
    }
  }

  function height(currentNode = root) {
    let left = 0;
    let right = 0;
    if (currentNode === null) return 0;
    if (currentNode.left === null && currentNode.right === null) return 0;
    left = height(currentNode.left);
    right = height(currentNode.right);
    return Math.max(left, right) + 1;
  }
  function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    let mid = arr.length / 2;
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);

    left = mergeSort(left);
    right = mergeSort(right);
    return merge(left, right);
  }
  function merge(left, right) {
    let i = 0;
    let j = 0;
    let result = [];
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) result.push(left[i++]);
      else result.push(right[j++]);
    }
    if (i < left.length) result = result.concat(left.slice(i));
    if (j < right.length) result = result.concat(right.slice(j));
    return result;
  }
  function removeDuplicates(arr) {
    const uniqueValues = {};
    const result = [];

    for (let item of arr) {
      if (!uniqueValues[item]) {
        result.push(item);
        uniqueValues[item] = true;
      }
    }
    return result;
  }

  function prettyPrint(node = root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  return {
    prettyPrint,
    insert,
    deleteNode,
    find,
    levelOrder,
    preorder,
    inorder,
    postorder,
    height,
  };
}

const drive = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 230, 6345, 324];
const tree2 = tree(drive);
