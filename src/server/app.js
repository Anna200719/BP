import express from 'express';
import bodyParser from 'body-parser';
import dbData from "./dbs/db";
import businessPartnersServices from "./services/businessPartners"
import util from 'util';
var app = express();

const PORT = 3000


app.use("/", express.static("/Users/annaduchovny/Desktop/XiomaHomeWork/src/client"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/aassets', express.static('assets'));

console.log("Started nodejs server on " + PORT + " port")
app.listen(PORT);

let logInDetailes = {
    "username": "manager",
    "password": "1234",
    "companyDB": "SBODEMOUS"
}

dbData.populateDB();
//console.log("My array is: " + util.inspect(dbData.businessPartnersDB), { depth: null })

app.get('/businesspartners', function (req, res, next) {
    try {
        const businesspartners = businessPartnersServices.getAllParners();
        res.send(businesspartners);
    } catch (error) {
        res.status(401).json(error);
    }
});

app.post("/addbusinesspartner", function(req, res){
    try {
        console.log("What is in body"+ JSON.stringify(req.body));
        
        if(req.body[0]['value'] == ""){
            throw "BP shoud contain card name"
        }

        businessPartnersServices.addNewPartner(req.body);
        res.status(200).json('Partner was added.');
    } catch (error) {
        console.log(error)
        res.status(409).json(error);
    }
});

app.delete("/deletepartner", function(req, res) {
    try {
        const idToDelete = req.body.id_to_delete
        console.log("Id to delete " + idToDelete )
        if (!idToDelete)
        {
            throw "No partner id to delete"
        }
        businessPartnersServices.removePartner(idToDelete)
        res.status(200).json(idToDelete + " was deleted."); 
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
    });

app.post("/login", function (req, res) {
    try {
        if (req.body.username === logInDetailes.username &&
            req.body.password === logInDetailes.password &&
            req.body.companyDB === logInDetailes.companyDB) {
            res.status(200).json({ redirect: "businessPartners.html" });
        }
        else {
            throw "Invalid login details"
        }
    } catch (error) {
        res.status(401).json(error);
    }
});