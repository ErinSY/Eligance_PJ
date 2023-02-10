import { Router } from 'express';
import { getClassification, getGender } from '../controllers/category.js';

const router = Router();

/** 카테고리(분류) 목록 전달 */
router.get('/classification', getClassification);

/** 카테고리(성별) 목록 전달 */
router.get('/gender', getGender);

export default router;
