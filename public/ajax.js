const ajax = {
  get(args) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', args.url, true);

    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          if (typeof args.success === 'function') {
            args.success(this.responseText);
          }
        } else if (typeof args.error === 'function') {
          args.error(this);
        }
      }
    };

    xhr.send();
  }
};
