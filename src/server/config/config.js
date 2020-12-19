const config = {
  PORT: process.env.PORT || 3000,
  LOGIN: {
    username: 'manager',
    password: '1234',
    companyDB: 'SBODEMOUS',
  },
  LETTERS_REGX: /^[0-9a-zA-Z]+$/,
};

export default config;
