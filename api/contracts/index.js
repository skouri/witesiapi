import express from 'express';
import ESI from '../../ESI';

const router = express.Router(); // eslint-disable-line
router.get('/', async (req, res) => {
  res.send(await ESI.getAllContractInfo('10000002',1));
});

export default router;