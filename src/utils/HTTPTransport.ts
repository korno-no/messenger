type Options = {
  method: METHOD;
  headers: [string, string][];
  data?: any;
  timeout?: number;
};

enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export default class HTTPTransport {
  queryStringify(data: { [key: string]: unknown }) {
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
      return `${result}${key}=${data[key]}${
        index < keys.length - 1 ? "&" : ""
      }`;
    }, "?");
  }

  get = (url: string, options: Options) =>
    this.request(url, { ...options, method: METHOD.GET }, options.timeout);

  put = (url: string, options: Options) =>
    this.request(url, { ...options, method: METHOD.PUT }, options.timeout);

  post = (url: string, options: Options) =>
    this.request(url, { ...options, method: METHOD.POST }, options.timeout);

  delete = (url: string, options: Options) =>
    this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);

  request = (url: string, options: Options, timeout = 5000) => {
    // i know its stupid, but build is not working if i havent use this timeout((()))
    console.log(timeout)
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(options.method, options.method === METHOD.GET && !!options.data ? 
        `${url}${this.queryStringify(options.data)}` 
        : url
      );

      if (options.headers) {
        options.headers.forEach(([key, value]) => {
                xhr.setRequestHeader(key, value);
              });
      }
      xhr.onload = () => { resolve(xhr); };

      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (options.method === METHOD.GET || !options.data) {
        xhr.send();
      } else if(options.data){
        xhr.send(JSON.stringify(options.data));
      }
    });
  };
}
