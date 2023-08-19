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
  function deleteNode(value, currentNode = root) {
    if (currentNode === null) {
      return currentNode;
    }
    if (value > currentNode.data) {
      currentNode.right = deleteNode(value, currentNode.right);
    }
    if (value < currentNode.data) {
      currentNode.left = deleteNode(value, currentNode.left);
    }

    // Finish here
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

  return { prettyPrint, insert };
}

const drive = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 230, 6345, 324];
const tree2 = tree(drive);
