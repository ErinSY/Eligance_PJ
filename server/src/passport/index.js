import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStragegy } from 'passport-local';
import User from '../schemas/user.js';

const passportConfig = { usernameFiled: 'email', passwordField: 'password' };
const passportVerify = async (email, password, done) => {
  try {
    console.log('user', userver);
    const user = await User.findOne({ $where: { email } });
    if (!user) {
      done(null, false, { message: '존재하지 않는 사용자입니다.' });
      return;
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (comparePassword) {
      done(null, user);
      return;
    } else {
      done(null, false, { message: '올바르지 않은 비밀번호 입니다.' });
    }
  } catch (err) {
    console.error(err);
    done(err);
  }
};

export default () => {
  console.log('passport');
  passport.use('local', new LocalStragegy(passportConfig, passportVerify));
};
