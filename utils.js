
function undefinedOrNull (params) {
  return (params === undefined || params === null);
}

function mergeObjets (params) {
  if (!params instanceof Array)
    return null;
  let result = {};
  params.forEach((i) => {
    if (!undefinedOrNull(i) && i instanceof Object) {
      const keys = Object.keys(i);
      keys.forEach((j) => {
        result[j] = i[j];
      });
    }
  });
  return result;
}

module.exports = {
  undefinedOrNull,
  mergeObjets,
}
