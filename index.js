function tree(arr) {
  const root = buildTree();
  return {};
}
function buildTree(arr) {}
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

function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
