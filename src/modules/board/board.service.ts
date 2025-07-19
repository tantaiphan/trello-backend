/* eslint-disable no-console */
import { Request, Response } from 'express';
import { BoardDTO, CreateBoardDTO } from './board.dto';
import { db } from '../../database/firebase';
import { HttpStatusCodeEnum } from '../../core/ultils/app-enum';

const create = async (req: Request<any, any, CreateBoardDTO>, res: Response) => {
  try {
    const newBoard = req.body;

    if (!newBoard || !newBoard.name) {
      return res.status(HttpStatusCodeEnum.BadRequest).json({ error: 'Missing required fields' });
    }



    const docRef = await db.collection('boards').add(newBoard);

    const data: BoardDTO = {
      ...newBoard,
      id: docRef.id, }


    return res.status(HttpStatusCodeEnum.Success).json(data);
  } catch (error) {
    console.error('Error create:', error);
    return res.status(HttpStatusCodeEnum.InternalServerError).json({ error: 'Internal Server Error' });
  }
};



const getAlls = async (req: Request, res: Response) => {
  try {
    const snapshot = await db.collection('boards').get();

    const boards: BoardDTO[] = [];

    snapshot.forEach((doc) => {
      boards.push({
        ...(doc.data() as BoardDTO),
        id: doc.id,
      });
    });

    return res.status(HttpStatusCodeEnum.Success).json(boards);
  } catch (error) {
    console.error('Failed get:', error);
    return res.status(HttpStatusCodeEnum.InternalServerError).json({ error: 'Failed to fetch boards' });
  }
};

const getById = async (req: Request, res: Response) => {
  const boardId = req.params.id;

  if (!boardId) {
    return res.status(HttpStatusCodeEnum.BadRequest).json({ error: 'Missing required fields' });
  }

  try {
    const docRef = db.collection('boards').doc(boardId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(HttpStatusCodeEnum.BadGateway).json({ error: 'Board not found' });
    }

    const board: BoardDTO = {
      ...(doc.data() as BoardDTO),
      id: doc.id,
    };

    return res.status(HttpStatusCodeEnum.Success).json(board);
  } catch (error) {
    console.error('Error get:', error);
    return res.status(HttpStatusCodeEnum.InternalServerError).json({ error: 'Internal Server Error' });
  }
};

const update = async (req: Request<any, any, CreateBoardDTO>, res: Response) => {
  const boardId = req.params.id;

  const dataUpdate = req.body;

  if (!boardId) {
    return res.status(HttpStatusCodeEnum.BadRequest).json({ error: 'Missing ID' });
  }

  if (!dataUpdate || !dataUpdate.name) {
    return res.status(HttpStatusCodeEnum.BadRequest).json({ error: 'Missing required fields' });
  }


  try {
    const docRef = db.collection('boards').doc(boardId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(HttpStatusCodeEnum.NotFound).json({ error: 'Not found' });
    }

    await docRef.update(dataUpdate);

    return res.status(HttpStatusCodeEnum.Success).json({
      id: boardId,
      ...dataUpdate,
    });
  } catch (error) {
    console.error('Error updating:', error);
    return res.status(HttpStatusCodeEnum.InternalServerError).json({ error: 'Internal Server Error' });
  }
};

const deleteById = async (req: Request, res: Response) => {
  const boardId = req.params.id;

  if (!boardId) {
    return res.status(HttpStatusCodeEnum.BadRequest).json({ error: 'Missing ID' });
  }

  try {
    const docRef = db.collection('boards').doc(boardId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(HttpStatusCodeEnum.NotFound).json({ error: 'Not found' });
    }

    await docRef.delete();

    return res.status(HttpStatusCodeEnum.Success).json();
  } catch (error) {
    console.error('Error delete:', error);
    return res.status(HttpStatusCodeEnum.InternalServerError).json({ error: 'Internal Server Error' });
  }
};


export const boardService = {
  create,
  getAlls,
  getById,
  update,
  deleteById,
};