import express from 'express';
import Character from './characterModel';
import asyncHandler from 'express-async-handler';

const router = express.Router(); // eslint-disable-line


// Get all characters, using try/catch to handle errors
router.get('/', async (req, res) => {
  try {
    const characters = await Character.find();
    res.status(200).json(characters);
  } catch (error) {
    handleError(res, error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    console.log("Yo1: " + req.params.id);
    const character = await Character.findById(req.params.id);
    console.log("Yo: " + character);
    if (!character) return res.send(404);
    res.status(200).json(character);
  } catch (error) {
    handleError(res, error.message);
  }
});

// Create a character, using async handler
router.post('/', asyncHandler(async (req, res) => {
  const character = await Character.create(req.body);
  res.status(201).json(character);
}));

// Update a character
router.put('/:id', asyncHandler(async (req, res) => {
  if (req.body._id) delete req.body._id;
  const character = await Character.update({
    _id: req.params.id,
  }, req.body, {
    upsert: true,
  });
  if (!character) return res.sendStatus(404);
  return res.json(200, character);
}));

// Delete a character
router.delete('/:id', asyncHandler(async (req, res) => {
  const character = await Character.findById(req.params.id);
  if (!character) return res.send(404);
  await character.remove();
  return res.status(204).send(character);
}));


/**
 * Handle general errors.
 * @param {object} res The response object
 * @param {object} err The error object.
 * @return {object} The response object
 */
function handleError(res, err) {
  return res.send(500, err);
}

export default router;