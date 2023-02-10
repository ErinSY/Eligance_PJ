import { Router } from 'express';
import { signUp, logIn, getUserDetails, modifyUser, deleteUser } from '../controllers/user.js';

const router = Router();

// * 회원가입 api
router.post('/signup', signUp);

// * 로그인 api
router.post('/login', logIn);

// * 회원 정보 조회
router.get('/:user_id', getUserDetails);

// * 회원 정보 수정
router.patch('/:user_id', modifyUser);

// * 회원 정보 삭제
router.delete('/:user_id', deleteUser);

export default router;
