const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const router = Router();
const axios = require('axios');
// const fetch = require('node-fetch');

// /api/auth/reqister
router.post(
  '/register',
  [
    // check('email', 'Некоректный email').isEmail(),
    // check('password', 'Минимальная длина пароль 6 символов').isLength({
    //   min: 6,
    // }),
  ],
  async (req, res) => {
    try {
      // const errors = validationResult(req);

      const { email } = req.body;

      const response = await axios.get(email, {
        headers: {
          Referer: email,
          'X-Requested-With': 'XMLHttpRequest',
          'User-Agent': 'Axios- console app',
          // 'User-Agent': 'axios/0.26.1',
          // 'Content-Type': 'text/html',
          // Accept:
          //   'text/html,application/xhtml+xml,application/xml;image/avif,image/webp,image/apng,*/*;application/signed-exchange;v=b3;',
        },
      });

      // const html = fetch(email);
      // const html = await fetch('https://vibe.naver.com/chart/total');

      // const test = html.text();

      // console.log('body', email);
      // console.log(response);
      // if (!errors.isEmpty()) {
      //   return res.status(400).json({
      //     errors: errors.array(),
      //     message: 'Некоректные данные при регистрации',
      //   });
      // }

      // const { email, password } = req.body;

      // const candidate = await User.findOne({ email });

      // if (candidate) {
      //   return res
      //     .status(400)
      //     .json({ message: 'Такой пользователь уже существует' });
      // }

      // const hashedPassword = await bcrypt.hash(password, 12);
      // const user = new User({ email, password: hashedPassword });

      // await user.save();

      // res.status(201).json({ message: 'Пользователь создан' });
      res.status(200).json({
        message: response.status,
        body: response.data,
        // bodyTest: test,
      });
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Что-то пошло не так, попробуйте еще раз' });
    }
  }
);

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите коректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
  ],
  async (req, res) => {
    console.log('Body:', req.body);

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некоректные данные при входе в систему',
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Пользователя не существует' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль' });
      }

      const token = jwt.sign(
        { userId: user.id, test: 'очень важная информацwgrbdsbия' },
        'esgfgrksogrg',
        {
          expiresIn: '30m',
        }
      );

      res.json({ token, userId: user.id });
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Что-то пошло не так, попробуйте еще раз' });
    }
  }
);

module.exports = router;
