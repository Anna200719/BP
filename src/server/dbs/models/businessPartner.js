import codeGenerator from '../../utils/generateCode';

class BusinessPartner {
  constructor(cardName, cardType, groupCode, address, zipCode, mailAddress,
    mailZipCode, phone1, phone2) {
    this.cardCode = codeGenerator();
    this.cardName = cardName;
    this.cardType = cardType;
    this.groupCode = groupCode;
    this.address = address;
    this.zipCode = zipCode;
    this.mailAddress = mailAddress;
    this.mailZipCode = mailZipCode;
    this.phone1 = phone1;
    this.phone2 = phone2;
  }
}

export default BusinessPartner;
