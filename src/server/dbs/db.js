import BusinessPartner from './models/businessPartner';

const businessPartnersDB = {};

const populateDB = function populateDB() {
  const bp1 = new BusinessPartner('card1', 'type1', 'group code 1', 'ramat-gan', 'zip1',
    'test@a.com', 'mail zip 1', '05405405418', '0534567898');

  businessPartnersDB[bp1.cardCode] = bp1;

  const bp2 = new BusinessPartner('card2', 'type2', 'group code 2', 'holon', 'zip2',
    'test2@a.com', 'mail zip 2', '05405405418', '0534567898');

  businessPartnersDB[bp2.cardCode] = bp2;
};
const setBusinessPartner = function setBusinessPartner(bp) {
  businessPartnersDB[bp.cardCode] = bp;
};

const dbData = { businessPartnersDB, populateDB, setBusinessPartner };
export default dbData;
