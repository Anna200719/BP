import dbData from '../dbs/db';
import dbService from '../dbs/service/dbService';
import BusinessPartner from '../dbs/models/businessPartner';

const getAllParners = () => dbData.businessPartnersDB;

const addNewPartnerByProperties = (partnerProps) => {
  const allProperties = Object.values(partnerProps);
  const bp = new BusinessPartner(...allProperties);
  dbService.setBusinessPartner(bp);
};

const addNewPartner = (partner) => {
  const partnerProps = {};

  // exctracting all properties with values from html-form
  Object.keys(partner).forEach((propIndex) => {
    const property = partner[propIndex];
    console.log(`What is in property ${(JSON.stringify(property))}`);
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
