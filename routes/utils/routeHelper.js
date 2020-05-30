//Using for oauth
module.exports = () => {
  if(!process.env.REACT_APP_PROD_URL) {
      return process.env.REACT_APP_DEV_URL_FRONTEND;

  }
  return process.env.REACT_APP_PROD_URL;
}