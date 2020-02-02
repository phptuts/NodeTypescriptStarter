import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_, res) => {
  const b = 'blue';
  return res.send('rwerwe sdfsd ' + b);
});

app.listen(PORT, () => {
  console.log(`Server listening on port  ${PORT}`);
});
