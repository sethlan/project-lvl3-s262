import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import http from 'http';

export default url => new Promise((resolve, reject) => {
  // axios.defaults.host = url;
  // axios.defaults.adapter = httpAdapter;
  // axios.get('/user')
  //   .then((response) => {
  //     resolve(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     reject(error);
  //   });
  http.get(url, (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const json = JSON.parse(rawData);
        resolve(json);
      } catch (e) {
        reject(e.message);
      }
    });
  }).on('error', (e) => {
    reject(e.message);
  });
});
