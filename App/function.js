/**
 * alert function
 */

const createAlert = (msg, type = "danger") => {
  return `<p class="alert alert-${type} d-flex        justify-content-between"> ${msg} <button class="btn-close" data-bs-dismiss="alert"></button></p>`;
};

/**
 * get LS data
 */
const getLsData = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return [];
  }
};

/**
 * create Ls data
 */
const createLsData = (key, data) => {
  // init data
  let takObj;

  // get ls data
  let lsData = JSON.parse(localStorage.getItem(key));

  // create Array if !exist
  if (!lsData) {
    takObj = [];
  } else {
    takObj = lsData;
  }

  // push data
  takObj.push(data);

  // save data in Ls
  localStorage.setItem(key, JSON.stringify(takObj));
};

/**
 * update LS data
 */
const updateDataLs = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

/**
 * Time Ago function
 */
const timeAgo = (timestamp) => {
  const currentTime = Date.now();
  const timeDifference = currentTime - timestamp;

  // Define time units in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDifference < minute) {
    return "Just now";
  } else if (timeDifference < hour) {
    const minutesAgo = Math.floor(timeDifference / minute);
    return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDifference < day) {
    const hoursAgo = Math.floor(timeDifference / hour);
    return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
  } else if (timeDifference < month) {
    const daysAgo = Math.floor(timeDifference / day);
    return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
  } else if (timeDifference < year) {
    const monthsAgo = Math.floor(timeDifference / month);
    return `${monthsAgo} ${monthsAgo === 1 ? "month" : "months"} ago`;
  } else {
    const yearsAgo = Math.floor(timeDifference / year);
    return `${yearsAgo} ${yearsAgo === 1 ? "year" : "years"} ago`;
  }
};
