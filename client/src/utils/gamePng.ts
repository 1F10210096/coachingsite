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

const defaultImage = 'default.png';

const getImagePath = (Id: number, rank: number) => {
  let imageMap: { [rank: number]: string } | undefined;
  if (Id === 1) {
    imageMap = valoImageMap;
  } else if (Id === 2) {
    imageMap = apexImageMap;
  } else if (Id === 3) {
    imageMap = lolImageMap;
  } else {
    console.log('default');
  }
  if (!imageMap) {
    console.log('default');
    return `/${defaultImage}`;
  }
  return `/${imageMap[rank] || 'default.png'}`;
};

export default getImagePath;
