// xhrコールバックパターン
function xhrCallback(url, callback, opts) {
  const xhr = new XMLHttpRequest();
  xhr.open(opts.method, url);
  xhr.onload = callback;
  xhr.send();
}

xhrCallback('./doc.md', ev => {
  document.write(ev.target.response);
  console.log(ev.target.response);
}, {method: 'GET'});



// xhr Promiseパターン
function xhrPromise(url, opts) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open(opts.method, url);
    xhr.onload = resolve;
    xhr.send();
  });
}

xhrPromise('./package.json', {method: 'GET'})
  .then(ev => {
    document.write(ev.target.response);
    console.log(ev.target.response);
  });
