import dbData from '../db';
import BusinessPartner from '../models/businessPartner';

const populateDB = function populateDB() {
  const bp1 = new BusinessPartner('card1', 'type1', 'group code 1', 'ramat-gan', 'zip1',
    'test@a.com', 'mail zip 1', '05405405418', '0534567898');

  dbData.businessPartnersDB[bp1.cardCode] = bp1;

  const bp2 = new BusinessPartner('card2', 'type2', 'group code 2', 'holon', 'zip2',
    'test2@a.com', 'mail zip 2', '05405405418', '0534567898');

  dbData.businessPartnersDB[bp2.cardCode] = bp2;
};
const setBusinessPartner = function setBusinessPartner(bp) {
  dbData.businessPartnersDB[bp.cardCode] = bp;
};

const dbService = { populateDB, setBusinessPartner };
export default dbService;
