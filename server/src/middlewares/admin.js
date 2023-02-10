import jwt from 'jsonwebtoken';

const admin = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, process.env.JWT || 'test');
    }
    if (decodedData.admin) {
      next();
    } else {
      res.status(401).json({ message: '요청 권한이 없습니다.' });
    }
  } catch (error) {
    res.status(401).json({ message: '로그인이 만료되었습니다.' });
    console.log(error);
  }
};

export default admin;
