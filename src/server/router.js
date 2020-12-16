import express from 'express';
import dbService from './dbs/service/dbService';
import businessPartnersServices from './services/businessPartners';

const router = express.Router();

const logInDetailes = {
  username: 'manager',
  password: '1234',
  companyDB: 'SBODEMOUS',
};

dbService.populateDB();

router.use((req, res, next) => {
  next();
});

router.get('/businesspartners', (req, res) => {
  try {
    const businesspartners = businessPartnersServices.getAllParners();
    res.send(businesspartners);
  } catch (error) {
    res.status(401).json(error);
  }
});

router.post('/businesspartner', (req, res) => {
  try {
    console.log(`What is in body where card name empty value ${JSON.stringify(req.body[0].value)}`);

    if (req.body[0].value === '') {
      throw new Error('BP shoud contain card name');
    }

    businessPartnersServices.addNewPartner(req.body);
    res.status(200).json('Partner was added.');
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
  try {
    if (req.body.username === logInDetailes.username
          && req.body.password === logInDetailes.password
          && req.body.companyDB === logInDetailes.companyDB) {
      res.status(200).json({ redirect: 'businessPartners.html' });
    } else {
      throw new Error('Invalid login details');
    }
  } catch (error) {
    res.status(401).json(error);
  }
});

export default router;
