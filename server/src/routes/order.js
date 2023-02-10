import { Router } from 'express';
import { createOrder, getOrderDetails, modifyOrderDetails, deleteOrder } from '../controllers/order.js';

const router = Router();

// * 주문 추가
router.post('/', createOrder);

// * 주문 조회
router.get('/:user_id', getOrderDetails);

// * 주문 수정
router.patch('/:order_id', modifyOrderDetails);

// * 주문 취소
router.delete('/:order_id', deleteOrder);

export default router;