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
  let array = removeDuplicates(arr);
  array = mergeSort(array);
  const root = buildTree(array, 0, array.length - 1);

  function buildTree(arr, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const newNode = node(arr[mid]);
    newNode.left = buildTree(arr, start, mid - 1);
    newNode.right = buildTree(arr, mid + 1, end);
    return newNode;
  }
  //   function insert(value) {
  //     root = insertRec(value, root);
  //   }
  //   function insertRec(value, root) {
  //     if (root == null) {
  //       root = new node(value);
  //       return root;
  //     }
  //     if (value < root.data) root.left = insertRec(value, root.left);
  //     else root.right = insertRec(value, root.right);
  //     return root;
  //   }
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
    let longerArr = left.length > right.length ? left.length : right.length;
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

  return { root, prettyPrint };
}

const drive = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 230, 6345, 324];
