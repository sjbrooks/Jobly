import data from "./db-test.json";


function get(url) {

  // remove leading /
  const pathname = (new URL(url).pathname).slice(1);
  return Promise.resolve({ data: data[pathname]});
}

const axios = {
  get: jest.fn(get)
};

// how to mock axios when jobly api is set up like this?

// try {
//   return (await axios({
//     method: verb,
//     url: `http://localhost:3001/${endpoint}`,
//     [verb === "get" ? "params" : "data"]: paramsOrData})).data;
//     // axios sends query string data via the "params" key,
//     // and request body data via the "data" key,
//     // so the key we need depends on the HTTP verb
// }

export default axios;
