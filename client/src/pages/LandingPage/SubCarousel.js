import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StyledSlider = styled(Slider)`
  .slick-prev {
    z-index: 1;
    left: 30px;
  }

  .slick-next {
    right: 40px;
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 30px;
    opacity: 0.5;
    color: black;
  }

  .slick-dots {
    display: flex;
    justify-content: center;
    bottom: 30px;
    color: black;

    li button:before {
      color: black;
    }

    li.slick-active button:before {
      color: white;
    }
  }

  margin-top: 50px;
  margin-bottom: 100px;
`;

const SubCardBox = styled.div`
  width: 300px;
  height: 300px;
  margin: 0 0px 0 17.5vh;
  text-align: center;
  border-radius: 25px;
  float: left;
  background: rgba(153, 164, 151, 1);
`;

const ItemImg = styled.img`
  width: 300px;
  height: 230px;
  border-radius: 25px 25px 0 0;
`;

function SubCarousel() {
  //상품정보 받아오기
  //   const [item, setItem] = useState([]);
  //   const [price, setPrice] = useState([]);

  //   useEffect(() => {
  //     try {
  //       const res = axios.get('');
  //       const getItem = res.data.name;
  //       const getPrice = res.data.price;
  //       setItem(getItem);
  //       setPrice(getPrice);
  //     } catch (error) {
  //       console.log('상품정보를 가져오지 못했습니다.');
  //     }
  //   }, []);

  const settings = {
    dots: true,
    fade: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <StyledSlider {...settings}>
        <div>
          <SubCardBox>
            <ItemImg alt="SliderItem1" src="/image/bottega1.jpg" />
            <p>상품1 1,000,000KRW</p>
          </SubCardBox>
          <SubCardBox>
            <ItemImg alt="SliderItem1" src="/image/bottega1.jpg" />
            <p>상품2 1,000,000KRW</p>
          </SubCardBox>
          <SubCardBox>
            <ItemImg alt="SliderItem1" src="/image/bottega1.jpg" />
            <p>상품3 1,000,000KRW</p>
          </SubCardBox>
        </div>
        <div>
          <SubCardBox>
            <ItemImg alt="SliderItem2" src="/image/bottega2.jpg" />
          </SubCardBox>
          <SubCardBox>
            <ItemImg alt="SliderItem2" src="/image/bottega2.jpg" />
          </SubCardBox>
          <SubCardBox>
            <ItemImg alt="SliderItem2" src="/image/bottega2.jpg" />
          </SubCardBox>
        </div>
      </StyledSlider>
    </div>
  );
}

export default SubCarousel;
