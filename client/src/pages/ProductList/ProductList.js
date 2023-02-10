import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ShowProduct from './ShowProduct';

export default function ProductList() {
  const [category, setCategory] = useState([]);
  const [ScrollY, setScrollY] = useState(0); // 스크롤값 저장
  const [BtnToTop, setBtnToTop] = useState(false);
  const [currentTab, setCurrentTab] = useState('의류');

  // axios request data
  const [reqData, setReqData] = useState({
    gender: '',
    major_classification: '',
    minor_classification: '',
  });

  // reqDataHandlers
  const reqDataHandlers = e => {
    if (e.target.title === 'major_classification') {
      setReqData({
        ...reqData,
        minor_classification: '',
        [e.target.title]: e.target.id,
      });
    } else {
      setReqData({
        ...reqData,
        [e.target.title]: e.target.id,
      });
    }
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:5001/product?gender=${reqData.gender}&major_classification=${reqData.major_classification}&minor_classification=${reqData.minor_classification}`
      )
      .then(res => {
        setCategory(res.data.products);
      });
  }, [reqData]);

  // 맨 위로가기 기능

  const handleScroll = () => {
    setScrollY(window.pageYOffset); // window 스크롤 값저장
    ScrollY > 100 ? setBtnToTop(true) : setBtnToTop(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setScrollY(0);
    setBtnToTop(false); // 최상단에 있는경우 버튼 숨겨짐
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleScroll);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <Container>
      <MainNav>
        <span
          className="gender"
          id="여성"
          title="gender"
          onClick={reqDataHandlers}
        >
          여성
        </span>
        <span>|</span>
        <span
          className="gender"
          id="남성"
          title="gender"
          onClick={reqDataHandlers}
        >
          남성
        </span>
      </MainNav>

      <button
        className={BtnToTop ? 'topBtn active' : 'topBtn'}
        onClick={scrollToTop}
      >
        Top
      </button>

      <MenuTab>
        <ul className="tabs">
          {All_CATEGORY.map(el => {
            const { major_classification, id } = el;
            return (
              <li
                key={id}
                id={major_classification}
                title="major_classification"
                onClick={reqDataHandlers}
                onMouseDown={e => {
                  setCurrentTab(e.target.id);
                }}
              >
                {major_classification}
              </li>
            );
          })}
        </ul>
      </MenuTab>

      <SubMenuTab>
        <ul className="tabs">
          {All_CATEGORY.find(
            el => el.major_classification === currentTab
          ).minor_classification.map((el, idx) => (
            <li
              key={idx}
              id={el}
              title="minor_classification"
              onClick={reqDataHandlers}
            >
              {el}
            </li>
          ))}
        </ul>
      </SubMenuTab>

      <div className="contents">
        <ShowProduct datas={category} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 20px;
  width: 100%;
  padding: 40px;
  > .topBtn {
    position: fixed;
    opacity: 0;
    bottom: 40px;
    right: 40px;
    z-index: -10;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: 0 none;
    background: white;
    color: rgba(153, 164, 151, 1);
    border: 1.5px solid rgba(153, 164, 151, 1);
    font-size: 15px;
    font-weight: bold;
    box-shadow: 1px 1px 6px 3px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: opacity 0.3s ease-in;
  }

  .topBtn.active {
    z-index: 10;
    opacity: 1;
  }
  > .contents {
    text-align: center;
    font-size: 70px;
    border-top: none;
    color: black;
  }
`;

const MenuTab = styled.div`
  width: 95%;
  margin: 50px auto;
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  > .tabs {
    display: flex;
    > li {
      width: 100%;
      text-align: center;
      border: 1px solid #b1b1b1;
      padding: 20px;
      cursor: pointer;
      color: #b1b1b1;

      &:hover {
        font-wight: 900;
        border-bottom: none;
        color: black;
      }
    }
  }
`;

const SubMenuTab = styled.div`
  width: 70%;
  margin: 10px auto;
  font-size: 16px;
  text-align: center;
  font-weight: 600;
  > .tabs {
    display: flex;
    > li {
      width: 100%;
      text-align: center;
      border-right: 1px solid #b1b1b1;
      cursor: pointer;
      color: #b1b1b1;
      &:last-child {
        border-right: none;
      }

      &:hover {
        font-wight: 900;
        color: black;
      }
    }
  }

  > .contents {
    text-align: center;
    font-size: 70px;
    border-top: none;
    color: black;
  }
`;

const MainNav = styled.div`
  width: 13%;
  color: black;
  margin: 10px auto;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 23px;
  > span {
    padding: 5px;
  }
  > .gender {
    cursor: pointer;
  }
`;

const All_CATEGORY = [
  {
    id: 1,
    major_classification: '의류',
    minor_classification: ['티셔츠', '바지', '양말'],
  },
  {
    id: 2,
    major_classification: '가방',
    minor_classification: ['토트백', '숄더백', '클러치백'],
  },
  {
    id: 3,
    major_classification: '신발',
    minor_classification: ['구두', '운동화', '슬리퍼'],
  },
  {
    id: 4,
    major_classification: '액세서리',
    minor_classification: ['목걸이', '귀걸이', '팔찌'],
  },
];
