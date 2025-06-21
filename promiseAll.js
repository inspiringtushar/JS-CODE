/**
 * @param {Array<any>} promises - notice input might have non-Promises
 * @return {Promise<any[]>}
 */
function all(promises) {
  // your code here
  const result = [];
  let completed = 0;
  let settled = false;
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      return resolve([]);
    }
    promises.forEach((promise, i) => {
      Promise.resolve(promise)
        .then((val) => {
          result[i] = val;
          completed++;
          if (completed === promises.length) {
            settled = true;
            resolve(result);
          }
        })
        .catch((e) => {
          if (!settled) {
            settled = true;
            reject(e);
          }
        });
    });
  });
}

const promise1 = Promise.resolve("A");
const promise2 = Promise.reject("Error in B");
const promise3 = Promise.resolve("C");

// const promise1 = Promise.resolve("A");
// const promise2 = Promise.resolve("B");
// const promise3 = Promise.resolve("C");

all([promise1, promise2, promise3])
  .then((val) => {
    console.log(val);
  })
  .catch((e) => {
    console.log(e);
  });
