import type { GameListModel, gameListModel } from '$/commonTypesWithClient/models';
import { gameListRepository } from '$/repository/gameListRepository';
import { prismaClient } from '$/service/prismaClient';

import assert from 'assert';
export const gameListUsecase = {
  fetchinfo: async (): Promise<GameListModel[]> => {
    console.log('gameListUsecase.fetchinfo');
    const gameList = await gameListRepository.fetchinfo();
    assert(gameList !== null, 'gameListはnullです');
    return gameList;
  },
  fetchCategories: async (id: string): Promise<GameListModel[]> => {
    console.log('gameListUsecase.fetchCategories');
    const gameList = await gameListRepository.fetchCategories(id);
    assert(gameList !== null, 'gameListはnullです');
    return gameList;
  },
  createGame: async (id: number, title: string, genre: string) => {
    console.log('gameListUsecase.fetchCategories');
    try {
      const newGame = await prismaClient.gameList.create({
        data: {
          id,
          title,
          genre,
        },
      });
      console.log(newGame);
    } catch (error) {
      console.log(error);
    }
  },
  fetchList: async (): Promise<gameListModel[]> => {
    console.log('gameListUsecase.fetchCategories');
    const newGame = await prismaClient.gameList.findMany();
    console.log(newGame, 'dasdafa');
    return newGame;
  },
  update: async (id: number, title: string, genre: string) => {
    console.log('Updating game');
    try {
      const updatedGame = await prismaClient.gameList.update({
        where: { id }, // 更新するレコードのIDを指定
        data: { title, genre }, // 更新するデータ
      });
      console.log(updatedGame, 'Updated successfully');
      return updatedGame;
    } catch (error) {
      console.error('Failed to update game:', error);
      throw error; // エラーを外部に投げる
    }
  },
};
