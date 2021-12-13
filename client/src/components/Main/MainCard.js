import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import TopList from "./TopList";
import { IMG } from "./imageUrl";
import axios from "axios";
import { setLoginUserInfo } from "../../actions";

const randomIdx = Math.floor(Math.random() * IMG["backImg"].length);
const randomBackImg = IMG.backImg[randomIdx];

const MainSection = styled.section`
  @media only screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
  @media only screen and (min-width: 1050px) and (max-width: 1300px) {
    display: flex;
  }
  @media only screen and (min-width: 1300px) {
    display: flex;
  }
`;

const MainCardBody = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${randomBackImg});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 1rem;
  margin: 3.6rem 0.7rem 0.5rem 0.5rem;
  padding: 0;
  width: auto;
  height: auto;
  @media only screen and (max-width: 1050px) {
    padding-bottom: 1.5rem;
  }
  @media only screen and (min-width: 1050px) and (max-width: 1300px) {
    background-size: 100% 100%;
    width: 100rem;
  }
  @media only screen and (min-width: 1301px) {
    background-size: 100% 100%;
    width: 55rem;
  }
  .guest {
    display: none;
  }
  hr {
    width: 22.5rem;
    margin-left: 1rem;
    margin-top: 0;
  }
  span {
    border-radius: 0.3rem;
    background-color: #252a3c;
    color: white;
    height: 6rem;
    font-size: 1.2rem;
  }
  img {
    width: 2.5rem;
    margin-left: 1.5rem;
    margin-top: 1rem;
  }
  .user {
    background-color: transparent;
    align-self: flex-start;
    margin: 1rem 0 0 0;
    font-size: 2rem;
    padding: 1rem 5rem 1rem 1rem;
  }
  .totalPrice {
    align-self: flex-start;
    margin-left: 1rem;
    margin-top: 1rem;
    padding: 0.5rem 5rem 0.5rem 2.5rem;
    width: 15rem;
    div {
      text-align: center;
      margin-top: 0.7rem;
      font-size: 2rem;
    }
  }
  .nextPay {
    align-self: flex-start;
    margin-left: 1rem;
    margin-top: 1rem;
    padding: 0.5rem 5rem 0.5rem 2.5rem;
    width: 15rem;
  }
  @media only screen and (max-width: 500px) {
    .user {
      padding-right: 0;
    }
    .totalPrice {
      padding-left: 1.3rem;
    }
    .nextPay {
      padding-left: 1.3rem;
    }
    hr {
      width: 21.1rem;
    }
  }
`;

const MainCardBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  margin: 0;
  .subscribe {
    margin: 1rem 1rem 0rem 1rem;
    padding-left: 2rem;
    padding-top: 0.5rem;
    width: 7.5rem;
    height: 10.3rem;
  }
  @media only screen and (max-width: 500px) {
    .subscribe {
      padding-left: 0.8rem;
    }
  }
`;

const MainCardRightBottom = styled.div`
  display: flex;
  flex-direction: column;
  .info {
    margin-top: 1rem;
    margin-right: 5rem;
    margin-bottom: 1rem;
    padding: 0.5rem 0rem 0 1.5rem;
    width: 10.5rem;
    height: 5rem;
  }
  .addSub {
    padding: 0.5rem 1rem 0 0.5rem;
    width: 10.5rem;
    height: 3.8rem;
    text-align: center;
    font-size: 2rem;
    div {
      font-size: 0.9rem;
    }
  }
`;
const MainCard = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [service, setService] = useState([
    "-",
    "구독중인",
    "서비스가",
    "없습니다",
  ]);
  const [payDate, setPayDate] = useState([]);
  const {
    email,
    nickname,
    profile,
    total_price,
    total_scraps,
    total_subscribes,
  } = state.loginUserInfo; //! user정보

  useEffect(() => {
    axios.all([axios.get("/subscribe"), axios.get("/scrap")]).then(
      axios.spread((res1, res2) => {
        const total_subscribes = res1.data.subscribes.length;
        console.log(res1.data.subscribes[0]);
        const price =
          res1.data.subscribes &&
          res1.data.subscribes.map((el) => {
            return el.planprice.replace(/[^0-9]/g, "") * 1;
          });
        let total_price = 0;
        price.length !== 0
          ? (total_price =
              res1.data.subscribes &&
              price.reduce((acc, cur) => {
                return acc + cur;
              }))
          : (total_price = 0);
        const total_scraps = res2.data.scraps.length;
        console.log(total_scraps);
        const loginUserInfo = {
          email,
          nickname,
          profile,
          total_subscribes,
          total_price,
          total_scraps,
        };
        dispatch(setLoginUserInfo(loginUserInfo));
        if (res1.data.subscribes.length !== 0) {
          setService(
            res1.data.subscribes.map((el) => {
              return el.Service.title;
            })
          );
          setPayDate(
            res1.data.subscribes.map((el) => {
              return el.paydate;
            })
          );
        }
      })
    );
  }, []);

  // const nextPayDate = payDate.map((el) => {
  //   const date = new Date();
  //   let month = date.getMonth() + 1;
  //   let year = date.getFullYear();
  //   const nextDate = new Date(year, month, el);
  //   const btMs = nextDate.getTime() - date.getTime();
  //   const btDay = Math.round(btMs / (1000 * 60 * 60 * 24));
  //   return btDay;
  // });
  const nextPayDate = [4, 1, 2, 3];
  const nextList = service.map(
    (el) =>
      nextPayDate.map((el2) => {
        return `${el} : ${el2}일 전`;
      })[0]
  );

  return (
    <>
      <MainSection>
        <MainCardBody>
          <div>
            <Link to="/MySubllet">
              <img
                alt="defaultImg"
                src={
                  profile
                    ? profile
                    : "https://i.esdrop.com/d/z3v0lj8ztjvc/OizvMNga4W.png"
                }
              />
              <span className="user">{nickname} 님의 Subllet</span>
            </Link>
          </div>
          <hr></hr>
          <span className="totalPrice">
            총 이용 금액: <br />
            <div>₩ {total_price}</div>
          </span>
          <span className="nextPay">
            다음 결제까지: <br />
            {nextList}
          </span>
          <MainCardBottom>
            <span className="subscribe">
              구독중
              <br />
              {service.map((el) => {
                return <div>{el}</div>;
              })}
            </span>
            <MainCardRightBottom>
              <span className="info">
                Huni 님의 <br />
                <div>총 구독 수 : {total_subscribes}개</div>
                <div>총 스크랩 수 : {total_scraps}개</div>
              </span>
              <span className="addSub">
                <Link to="/AllView">
                  <i className="fas fa-plus-circle"></i>
                </Link>
                <br />
                <div>구독을 추가하세요</div>
              </span>
            </MainCardRightBottom>
          </MainCardBottom>
        </MainCardBody>
        <TopList />
      </MainSection>
    </>
  );
};

export default MainCard;
