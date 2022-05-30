const each = (arr, cb) => {
  let i = 0;
  const last = arr.length - 1;
  const next = (i) => {
    setTimeout(() => {
      cb(arr[i], i);
      if (i !== last) next(++i);
    }, 0);
  };

  next(i);
};

let k = 0;

const timer = setInterval(() => {
  console.log('next ', k++);
}, 10);

each(new Array(1000).fill(1), (el, idx) => {
  if (idx === 999) {
    clearTimeout(timer);
  }
  console.log(idx);
});
