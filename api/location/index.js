import express from 'express';
import asyncHandler from 'express-async-handler';
import ESI from '../../ESI';

const router = express.Router(); // eslint-disable-line

router.get('/:characterId', asyncHandler(async (req, res) => {
    const contracts = await ESI.getAllContractInfo(10000001,1);
    return res.status(200).json(contracts);
  }));

export default router;