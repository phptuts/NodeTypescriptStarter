import express from 'express';

var router = express.Router();

router.get('/', (req, res) => {
  res.send('hello users');
});

router.get('/:id', (req, res) => {
  res.send('hello users');
});

router.put('/:id', (req, res) => {});

router.patch('/:id/change-password', (req, res) => {});

router.patch('/:id/forgot-password', (req, res) => {});

router.patch('/:id/reset-password', (req, res) => {});



export default router;