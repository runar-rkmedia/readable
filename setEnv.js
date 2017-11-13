/*jshint esversion: 6 */
console.log('NODE_PATH=src/')

const env = process.env.NODE_ENV;
if (env === 'production') {
  console.log(`REACT_APP_API_URL=${process.env.REACT_APP_API_URL}`);
} else {
  console.log(`REACT_APP_API_URL=http://localhost:3000`);
}
