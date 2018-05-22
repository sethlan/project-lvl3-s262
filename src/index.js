import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import url from 'url';
// import http from 'http';

export default addr => new Promise((resolve, reject) => {
  const { pathname, hostname } = url.parse(addr);
  axios.defaults.host = hostname;
  axios.defaults.adapter = httpAdapter;
  axios.get(pathname)
    .then((response) => {
      resolve(response.data);
    })
    .catch((error) => {
      // console.log(error);
      reject(error);
    });
  // http.get(url, (res) => {
  //   res.setEncoding('utf8');
  //   let rawData = '';
  //   res.on('data', (chunk) => { rawData += chunk; });
  //   res.on('end', () => {
  //     try {
  //       const data = JSON.parse(rawData);
  //       resolve(data);
  //     } catch (e) {
  //       reject(e.message);
  //     }
  //   });
  // }).on('error', (e) => {
  //   reject(e.message);
  // });
});
