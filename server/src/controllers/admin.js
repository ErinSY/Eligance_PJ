import Product from '../schemas/product.js';
import Gender from '../schemas/gender.js';
import Category from '../schemas/category.js';
import Order from '../schemas/order.js';

// * 상품 추가
export const createProduct = async (req, res) => {
    const { name, price, description, company, gender, major_classification, minor_classification } = req.body;
    try {
        const product = await Product.create({
            name,
            price,
            description,
            company,
            gender,
            major_classification,
            minor_classification,
        });
        res.json(product);
    } catch (error) {
        res.json({ error });
    }
}

// * 상품 삭제
export const deleteProduct = async (req, res) => {
    const productId = req.params.product_id;
    try {
        await Product.deleteOne({ _id: productId });
        res.json({ message: '삭제 완료되었습니다.' });
    } catch (error) {
        res.json({ message: '삭제 실패하였습니다.' });
    }
}

// * 카테고리 수정
export const modifyCategory = async (req, res) => {
    const { gender, classification } = req.body;
    try {
        await Gender.findOneAndUpdate({}, { gender });

        const majors = Object.keys(classification);
        majors.forEach(async (major) => {
            await Category.findOneAndUpdate({ major_classification: major }, { minor_classification: classification[major] });
        });
        res.json({ message: '카테고리가 수정되었습니다.' });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// * 전체 주문목록 조회
export const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "목록을 불러오지 못했습니다." })
    }
}

// * 주문 배송상태 수정
export const modifyOrderStatus = async (req, res) => {
    const orderId = req.params.order_id;
    const { status } = req.body;

    try {
        const orderModify = await Order.findOneAndUpdate(orderId, {
            status: status
        }, {
            returnNewDocument: true,
        })
        res.status(500).json(orderModify);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "배송 상태를 변경하지 못했습니다." })
    }
}