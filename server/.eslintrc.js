module.exports = {
  parserOptions: {
    project: './server/tsconfig.json',
  },
  ignorePatterns: ['server/server.js', 'server/service/prismaClient.js', 'server/server.d.ts'],
};
