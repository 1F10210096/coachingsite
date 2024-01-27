const tagImages: { [key: string]: string } = {
  初心者歓迎: 'beginner.png',
  上級者歓迎: 'wellplayer.png',
  エイム強化: 'aim.png',
  プロ志向: 'pro.png',
  スパルタ指導: 'suparuta.png',
  メンタル強化: 'heart.png',
  仲良くワイワイ: 'friend.png',
  // 他のタグと画像のマッピング
};

const getTagImagePath = (tag: string) => {
  console.log(tag);
  return `/tags/${tagImages[tag] || 'default.png'}`;
};
export default getTagImagePath;
