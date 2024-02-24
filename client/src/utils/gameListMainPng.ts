const gameListImageMap: { [key: number]: string } = {
  1: 'valorant.png',
  2: 'apex.png',
  3: 'lol.png',
  4: 'fortnite.png',
  5: 'StreetFighter.png',
  6: 'yuugiou.jpg',
  7: 'yuugiou.jpg',
};

const getGameListImagePathMain = (game: number) => {
  console.log(gameListImageMap[game]);
  return gameListImageMap[game] || 'default.png';
};

export default getGameListImagePathMain;
