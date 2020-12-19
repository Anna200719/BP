import express from 'express';
import dbService from './dbs/service/dbService';
import businessPartnersServices from './services/businessPartners';
import authenticationService from './services/authenticationService';

const router = express.Router();

dbService.populateDB();

router.use((req, res, next) => {
  // check cookies
  next();
});

router.get('/businesspartners', (req, res) => {
  try {
    console.log(`Cookies ${(req.cookies)}`);
    const businesspartners = businessPartnersServices.getAllParners();
    res.send(businesspartners);
  } catch (error) {
    res.status(401).json(error);
  }
});

router.post('/businesspartner', (req, res) => {
  try {
    if (!req.body.cardName) {
      throw new Error('BP shoud contain card name');
    }

    businessPartnersServices.addNewPartner(req.body);
    res.status(200).json('Partner was added.');
    // 202
    // 203
  } catch (error) {
    res.status(409).json(error.message);
  }
});

router.delete('/partner', (req, res) => {
  try {
    const idToDelete = req.body.id_to_delete;
    console.log(`Id to delete ${idToDelete}`);
    if (!idToDelete) {
      throw new Error('No partner id to delete');
    }
    businessPartnersServices.removePartner(idToDelete);
    res.status(200).json(`${idToDelete} was deleted.`);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//   const isAuth = (req, res, next) => {
//     if (check cookie login) {
//       return next();
//     }
//     res.redirect('/login');
//   };

router.post('/login', (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  const { companyDB } = req.body;
  try {
    authenticationService.isBasicSymbolValid(username, password, companyDB);
    authenticationService.authenticateUser(username, password, companyDB);
    res.cookie('name', 'express');// id i guid
    res.status(200).json({ redirect: 'businessPartners.html' });
  } catch (error) {
    console.log(error.message);
    res.status(401).json('Invalid login details');
  }
});

export default router;
