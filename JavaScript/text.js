//举例：formatAmount(2688) => "2,688.00"
//formatAmount("2e6") => "2,000,000.00"
//formatAmount(-2.33333333) => "-2.33"
//formatAmount("Alibaba") => "-"

function formatAmount(num) {
  if (typeof +num !== "number" || Number.isNaN(+num)) {
    return "-";
  }
  let low = (num + "").split(".")[1]
    ? (num + "").split(".")[1].substr(0, 2)
    : "00";
  let high = (+num + "").split(".")[0];
  if (high.length <= 3) {
    return high + "." + low;
  }
  let i = high.length,
    str = "";
  while (i >= 0) {
    if (i - 3 >= 0) {
      str = "," + high.substr(i - 3, i) + str;
    } else {
      str = "," + high.substr(0, i) + str;
    }
    i -= 3;
  }
  return str.substr(1) + "." + low;
}
formatAmount(2688);

function compareVersion(oldVersion, newVersion) {
  let oldVersionArr = oldVersion.split(".");
  let newVersionArr = newVersion.split(".");
  while (oldVersionArr.length) {
    let oldKey = oldVersionArr.shift();
    let newKey = newVersionArr.shift();
    if (+oldKey > +newKey) {
      return false;
    } else if (+oldKey === +newKey) {
      continue;
    } else {
      return true;
    }
    return false;
  }
}
compareVersion("1.0.2", "1.0.7");

Promise.race([p1, p2, p3]).then(value => {
  console.log(value);
});

var p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("111");
  }, 200);
});
var p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("222");
  }, 500);
});
var p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("333");
  }, 800);
});

/**
 *  (err) => {
  console.log('rejected', err)
 }
 */

Promise.race([p1, p3, p2]).then(value => {
  console.log(value);
});

var p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("111");
  }, 200);
})
  .then(() => {
    console.log("444");
  })
  .catch(err => {
    console.log(err);
  })
  .then(() => {
    console.log("555");
  });
