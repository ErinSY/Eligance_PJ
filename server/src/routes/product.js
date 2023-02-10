import { Router } from 'express';
import { getProducts, getProductDetails } from '../controllers/product.js';

const router = Router();

/** 상품 목록 */
router.get('/', getProducts);

/** 상품 상세 */
router.get('/:product_id', getProductDetails);

export default router;
