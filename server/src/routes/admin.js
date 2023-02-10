import { Router } from 'express';
import { createProduct, deleteProduct, modifyCategory, getAllOrder, modifyOrderStatus } from '../controllers/admin.js';
import upload from '../multer/index.js';

const router = Router();

/** 상품 추가 */
router.post('/product', upload.single('image'), createProduct);

/** 상품 삭제 */
router.delete('/product/:product_id', deleteProduct);

/** 카테고리 수정 */
router.patch('/category', modifyCategory);

// * 전체 주문목록 보기
router.get('/product', getAllOrder);

// * 배송 상태 수정하기
router.patch('product/:order_id', modifyOrderStatus);

export default router;
