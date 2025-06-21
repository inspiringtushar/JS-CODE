/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */
function any(promises) {
  // your code here
  let isResolved = false;
  const rejectResult = [];
  let rejectCount = 0;

  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      return resolve([]);
    }
    promises.forEach((promise, i) => {
      Promise.resolve(promise)
        .then((val) => {
          if (!isResolved) {
            isResolved = true;
            resolve(val);
          }
        })
        .catch((e) => {
          rejectResult[i] = e;
          rejectCount++;
          if (promises.length === rejectCount) {
            reject(
              new AggregateError(
                "No Promise in Promise.any was resolved",
                rejectResult
              )
            );
          }
        });
    });
  });
}

// const promise1 = Promise.resolve("A");
// const promise2 = Promise.reject("Error in B");
// const promise3 = Promise.resolve("C");

const promise1 = Promise.reject("A");
const promise2 = Promise.reject("B");
const promise3 = Promise.resolve("C");

any([promise1, promise2, promise3])
  .then((val) => {
    console.log(val);
  })
  .catch((e) => {
    console.log(e);
  });
