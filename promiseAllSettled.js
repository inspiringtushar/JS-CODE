/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */
function allSettled(promises) {
  // your code here
  let count = 0;
  const result = [];
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      return resolve([]);
    }
    promises.forEach((promise, i) => {
      Promise.resolve(promise)
        .then((val) => {
          result[i] = {
            status: "fulfilled",
            value: val,
          };
        })
        .catch((e) => {
          result[i] = {
            status: "rejected",
            reason: e,
          };
        })
        .finally(() => {
          count++;
          if (count === promises.length) {
            resolve(result);
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

allSettled([promise1, promise2, promise3])
  .then((val) => {
    console.log(val);
  })
  .catch((e) => {
    console.log(e);
  });
