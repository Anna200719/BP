import dbData from '../dbs/db';
import BusinessPartner from '../dbs/models/businessPartner';

const getAllParners = () => dbData.businessPartnersDB;

const addNewPartnerByProperties = (partnerProps) => {
  const bp = new BusinessPartner();
  const allProperties = Object.values(partnerProps);
  bp.addPartnerInfo(...allProperties);
  dbData.businessPartnersDB[bp.cardCode] = bp;
};

const addNewPartner = (partner) => {
  const partnerProps = {};

  // exctracting all properties with values from html-form
  Object.keys(partner).forEach((propIndex) => {
    const property = partner[propIndex];
    partnerProps[property.name] = property.value;
  });

  addNewPartnerByProperties(partnerProps);
};

const removePartner = (id) => {
  if (id in dbData.businessPartnersDB) {
    console.log(`found ${id} in db`);
    delete dbData.businessPartnersDB[id];
  } else {
    throw new Error('Partner id not found in db');
  }
};

const businessPartnersServices = { getAllParners, addNewPartner, removePartner };

export default businessPartnersServices;
