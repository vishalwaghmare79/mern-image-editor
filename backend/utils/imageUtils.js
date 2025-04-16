const getRandomColor = () => {
  const colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const generateImageUrl = (req, filename) => {
    return `${req.protocol}://${req.get('host')}/uploads/${filename}`;
};

module.exports = {
  getRandomColor,
  generateImageUrl,
};