// utils/getRankImagePath.js

const valoImageMap = {
  0: 'iron.png',
  1: 'bronze.png',
  2: 'silver.png',
  3: 'gold.png',
  4: 'platinum.png',
  5: 'diamond.png',
  6: 'asendant.png',
  7: 'immortal.png',
  8: 'radiant.png',
};

const apexImageMap = {
  0: 'bronze.png',
  1: 'silver.png',
  2: 'gold.png',
  3: 'platinum.png',
  4: 'diamond.png',
  5: 'master.png',
  6: 'pre.png',
};

const lolImageMap = {
  0: 'iron.png',
  1: 'bronze.png',
  2: 'silver.png',
  3: 'gold.png',
  4: 'platinum.png',
  5: 'emerald.png',
  6: 'diamond.png',
  7: 'master.png',
  8: 'grandmaster.png',
  9: 'challe.png',
};

const getImagePath = (Id: number, rank: number) => {
  console.log(Id);
  console.log(rank);
  let imageMap;
  if (Id === 1) {
    console.log('valoImageMap');
    imageMap = valoImageMap;
  } else if (Id === 2) {
    imageMap = apexImageMap;
  } else if (Id === 3) {
    imageMap = lolImageMap; 
  }
  else {
    console.log('default');
  }
  return `/${imageMap[rank] || 'default.png'}`;
};

export default getImagePath;
