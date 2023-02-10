import Category from '../schemas/category.js';
import Gender from '../schemas/gender.js';

// * 카테고리(분류) 목록 전달
export const getClassification = async (req, res) => {
  const category = await Category.find({});
  res.json({ category });
};

// * 카테고리(성별) 목록 전달
export const getGender = async (req, res) => {
  const { gender } = await Gender.findOne({});
  res.json({ gender });
};