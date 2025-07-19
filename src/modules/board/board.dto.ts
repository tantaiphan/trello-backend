export interface BoardDTO {
  id: string;
  name: string;
  description: string;
}

export type CreateBoardDTO = Omit<BoardDTO, 'id'>;