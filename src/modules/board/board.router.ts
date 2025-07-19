import express from 'express';
import { boardService } from './board.service';

const boardController = express.Router();

boardController.post('/', boardService.create);
boardController.get('/', boardService.getAlls);
boardController.get('/:id', boardService.getById);
boardController.put('/:id', boardService.update);
boardController.delete('/:id', boardService.deleteById);

export default boardController;
