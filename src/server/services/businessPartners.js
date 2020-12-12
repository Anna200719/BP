import dbData from "../dbs/db";
import BusinessPartner from "../dbs/models/businessPartner"

const getAllParners = function(){
    return dbData.businessPartnersDB;
}

const addNewPartner = function(partner){
    let bp = new BusinessPartner();
    let partnerProps = {}

    for (const pr in partner) 
    {
        partnerProps[partner[pr].name] = partner[pr].value
    }

    const props = Object.values(partnerProps);
    bp.addPartnerInfo(...props)
    dbData.businessPartnersDB[bp.cardCode] = bp;
}


const removePartner = function(id){
    
    if (id in dbData.businessPartnersDB){
        console.log("found " + id + " in db")
        delete dbData.businessPartnersDB[id]
    }
    else{
        throw "Partner id not found in db"
    }
}

const businessPartnersServices = { getAllParners , addNewPartner, removePartner, removePartner };
export default businessPartnersServices;
