import React, { useState } from "react";
import styled from "styled-components";
import dummy from "../../dummy/dummy";

import wavve_scrap from "../../IMG/Logo/wavve_scrap.png";

const MyScrapContainer = styled.main`
  /* width: 100%; */
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  /* margin-top: 2rem; */
  /* border: 0.5px solid white; */
  /* flex-basis: auto; */
`;
const TitleBox = styled.div`
  width: 100%;
  height: 3rem;
  display: inline-flex;
  /* border: 0.5px solid red; */
`;

const MyScrapTitle = styled.div`
  width: 100%;
  /* height: 10%; */
  display: flex;
  font-size: 2rem;
  color: #ff8a00;
  /* border: 0.5px solid white; */
`;

const MyScrapBox = styled.div`
  width: 100%;
  height: 90%;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 1%;
  display: inline-flex;
  flex-wrap: wrap;
  /* justify-content: center;
  align-items: center; */
  background-color: #252a3c;
  border-radius: 0.5rem;
  border: 0.5px solid white;
  div {
    width: 31%;
    height: 20%;
    margin-top: 1%;
    margin-left: auto;
    margin-right: auto;
    border: 0.5px solid white;
  }
`;

const ScrapImg = styled.img`
  width: 100%;
  /* height: 10rem; */
  display: flex;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const MyScrap = () => {
  return (
    <MyScrapContainer>
      <TitleBox>
        <MyScrapTitle>My Scrap</MyScrapTitle>
      </TitleBox>
      <MyScrapBox>
        {dummy.map((el) => {
          return (
            <div>
              <ScrapImg src={el.service.outer_image} />
            </div>
          );
        })}
        <div>
          <ScrapImg src={wavve_scrap} />
        </div>
        <div>
          <ScrapImg src={wavve_scrap} />
        </div>
        <div>
          <ScrapImg src={wavve_scrap} />
        </div>
      </MyScrapBox>
    </MyScrapContainer>
  );
};

export default MyScrap;