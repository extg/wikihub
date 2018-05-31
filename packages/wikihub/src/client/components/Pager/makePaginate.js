// Implementation in ES6
// https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
// FIXME: сделать правки из комментов в гисте
function createPagination(delta = 2) {
  return function (current, last) {
    const left = current - delta
    const right = current + delta + 1

    let range = []
    let rangeWithDots = []
    let l

    for (let i = 1; i <= last; i++) {
      if (i === 1 || i === last || i >= left && i < right) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }
}

export default createPagination;
