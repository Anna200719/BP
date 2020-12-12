import { REPL_MODE_SLOPPY } from "repl";

import BusinessPartner from "./models/businessPartner"

const businessPartnersDB = {}

const populateDB = function()
{
    let bp1 = new BusinessPartner();
    bp1.addPartnerInfo("card1", "type1","group code 1","ramat-gan","zip1",
    "test@a.com", "mail zip 1", "05405405418","0534567898")
    businessPartnersDB[bp1.cardCode] = bp1;

    let bp2 = new BusinessPartner();
    bp2.addPartnerInfo("card2", "type2","group code 2","holon","zip2",
    "test2@a.com", "mail zip 2", "05405405418","0534567898")
    businessPartnersDB[bp2.cardCode] = bp2;
}

const dbData = { businessPartnersDB, populateDB }
export default dbData;