import Order from '../schemas/order.js';
import User from '../schemas/user.js';

// * 주문 추가
export const createOrder = async (req, res) => {
    const { user_id, products, address, total_price, order_request } = req.body;
    const newOrder = {
        user: user_id,
        products,
        address,
        total_price,
        order_request
    };

    try {
        const order = await Order.create(newOrder);
        const user = await User.findOne({ _id: user_id });
        await User.findOneAndUpdate({ _id: user_id }, { order: [...user.order, order._id] });
        res.status(200).json({ message: '주문이 완료되었습니다.' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: '주문에 실패했습니다.' });
    };
};

// * 주문 정보 조회
export const getOrderDetails = async (req, res) => {
    const userId = req.params.user_id;

    try {
        const orders = await User.findById(userId).populate("order")
        const orderList = orders.order
        res.status(200).json(orderList);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: '주문목록을 받아오지 못했습니다.' });
    };
};

// * 주문 수정
export const modifyOrderDetails = async (req, res) => {
    const orderId = req.params.order_id;
    const { products, address, total_price, order_request } = req.body;
    try {
        const reOrder = await Order.findByIdAndUpdate(orderId, {
            products,
            address,
            total_price,
            order_request
        }, {
            new: true,
        });

        res.status(200).json(reOrder);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: '주문 수정을 완료하지 못했습니다.' })
    };
};

// * 주문 취소
export const deleteOrder = async (req, res) => {
    const orderId = req.params.order_id

    try {
        await Order.deleteOne({ _id: orderId })
        res.status(200).json({ message: '삭제가 완료되었습니다.' });
    } catch (error) {
        console.log(error);
        res.status(200).json({ message: '삭제에 실패했습니다.' });
    };
};