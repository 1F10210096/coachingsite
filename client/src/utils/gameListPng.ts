// utils/getRankImagePath.js

const gameListImageMap = {
  1: 'valorant.png',
  2: 'apex.png',
  3: 'lol.png',
  4: 'csgo.png',
  5: 'overwatch2.png',
  6: 'fortnite.png',
};

const getGameListImagePath = (game) => {
  console.log(gameListImageMap[game]);
  return gameListImageMap[game] || 'default.png'; // デフォルト画像がある場合はそれを返す
};

export default getGameListImagePath;
