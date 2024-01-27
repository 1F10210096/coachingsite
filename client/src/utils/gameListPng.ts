const gameListImageMap: { [key: number]: string } = {
  1: 'valorant.png',
  2: 'apex.png',
  3: 'lol.png',
  4: 'csgo.png',
  5: 'overwatch2.png',
  6: 'fortnite.png',
};

const getGameListImagePath = (game: number) => {
  console.log(gameListImageMap[game]);
  return gameListImageMap[game] || 'default.png';
};

export default getGameListImagePath;
