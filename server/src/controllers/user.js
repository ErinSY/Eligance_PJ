import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../schemas/user.js';
import bcrypt from 'bcryptjs';

// * 회원가입
export const signUp = async (req, res) => {
  const { email, name, password, address, contact } = req.body;

  if (!email || !name || !password || !address || !contact) {
    res.status(500).json({ message: '모든 항목을 입력해주세요.' });
  }

  if (password.length < 7) {
    res.status(500).json({ message: '비밀번호는 최소 7자리 이상 입력해주세요.' });
  }
  const user = await User.findOne({ email: email });
  if (user) {
    res.status(500).json({ message: '이미 존재하는 사용자입니다.' });
  } else {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = {
      email,
      name,
      password: hashedPassword,
      admin: false,
      contact,
      address,
    };
    try {
      await User.create(newUser);
      res.json({ message: '사용자가 정상적으로 등록되었습니다.' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: '회원가입에 실패했습니다.' });
    }
  }
};

// * 로그인
export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: '없는 사용자 입니다.' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: '잘못된 비밀번호입니다.' });
    }
    const secret = process.env.JWT || 'eligance';
    const token = jwt.sign(
      { email: existingUser.email, _id: existingUser._id, name: existingUser.name, admin: existingUser.admin },
      secret
      /*  {
                 expiresIn: '6h',
             } */
    );
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '로그인에 실패했습니다.' });
  }
};

// * 회원 정보 조회
export const getUserDetails = async (req, res) => {
  const userId = req.params.user_id;
  try {
    const user = await User.findOne({ _id: userId });
    const userInfo = {
      id: user._id,
      email: user.email,
      name: user.name,
      password: user.password,
      address: user.address,
      contact: user.contact,
    };
    console.log('userInfo', userInfo);
    res.status(200).json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '유저가 존재하지 않습니다.' });
  }
};

// * 회원 정보 수정
export const modifyUser = async (req, res) => {
  const userId = req.params.user_id;
  const { email, name, password, address, contact } = req.body;

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        email,
        name,
        password: hashedPassword,
        address,
        contact,
      },
      {
        new: true,
      }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// * 회원 정보 삭제
export const deleteUser = async (req, res) => {
  const userId = req.params.user_id;

  try {
    await User.deleteOne({ _id: userId });
    res.status(200).json({ message: '삭제가 완료되었습니다.' });
  } catch (error) {
    console.log(error);
    res.json({ message: '삭제에 실패했습니다.' });
  }
};
