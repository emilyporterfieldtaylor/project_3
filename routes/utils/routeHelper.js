//Using for oauth
module.exports = () => {
  if(!process.env.NODE_ENV) {
      return process.env.REACT_APP_DEV_URL_FRONTEND;

  }
  return process.env.REACT_APP_PROD_URL;
}
