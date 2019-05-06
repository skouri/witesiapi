import express from 'express';
import asyncHandler from 'express-async-handler';
import ESI from '../../ESI';

const router = express.Router(); // eslint-disable-line

router.get('/:characterId', asyncHandler(async (req, res) => {
    const contracts = await ESI.getAllContractInfo(10000001,1);
    const filtered = [];
    contracts.forEach(contract => {
      // console.log(contract.issuer_id);
      if (contract.issuer_id == req.params.characterId) {
        filtered.push(contract);
      }
    });

    // Sort by date issued in descending order.
    filtered.sort((a,b) => {
      let comparison = 0;
      if (a.date_issued > b.date_issued) {
        comparison = 1;
      } else if (a.date_issued < b.date_issued) {
        comparison = -1;
      }
      return -comparison;
    });

    return res.status(200).json(filtered);
  }));

export default router;