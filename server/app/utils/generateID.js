const generateID = () => Math.random().toString(36).substring(2, 10);

module.exports = generateID;
