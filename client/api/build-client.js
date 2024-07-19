import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server

    return axios.create({
      baseURL:
        'http://Ticketing-LoadBalancer-1060785181.ap-south-1.elb.amazonaws.com',
      headers: req.headers,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: '/',
    });
  }
};
