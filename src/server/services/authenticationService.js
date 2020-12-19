import config from '../config/config';

const isBasicSymbolValid = (username, password, companyDB) => {
  if (username.match(config.LETTERS_REGX)
        && password.match(config.LETTERS_REGX)
        && companyDB.match(config.LETTERS_REGX)) {
    return true;
  }
  throw new Error('Please input alphanumeric characters only');
};

const authenticateUser = (username, password, companyDB) => {
  if (username === config.LOGIN.username
        && password === config.LOGIN.password
        && companyDB === config.LOGIN.companyDB) {
    return true;
  }
  throw new Error('Username or password or companyDB invalid');
};

const authenticationService = { authenticateUser, isBasicSymbolValid };

export default authenticationService;
