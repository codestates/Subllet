import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { setLoginUserInfo, setIsLogin } from "../../actions";
import AlertModal from "../AlertModal";

const StyledBody = styled.section`
  color: white;
  margin: 2rem auto;
  max-width: 50rem;
  @font-face {
    font-family: "InfinitySans-RegularA1";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/InfinitySans-RegularA1.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  font-family: "InfinitySans-RegularA1";
`;

const StyledForm = styled.div`
  background-color: #252a3c;
  margin: 1rem;
  height: 18rem;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`;

const DeleteLabel = styled.div`
  font-size: 2rem;
  margin-left: 1rem;
`;

const PasswordInput = styled.div`
  margin: 5rem 2rem 0 1.5rem;
  div {
    margin-bottom: 0.2rem;
  }
  input {
    padding: 0.5rem;
    font-size: 1rem;
    width: 97%;
  }
  @media only screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 5rem 0 0 29.5%;
    div {
      margin-bottom: 0;
      font-size: 1rem;
    }
    input {
      margin-top: 0.1rem;
      padding: 0.5rem;
      font-size: 1rem;
      width: 56%;
    }
  }
`;

const DeleteButton = styled.div`
  display: flex;
  justify-content: center;
  button {
    @font-face {
      font-family: "InfinitySans-RegularA1";
      src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/InfinitySans-RegularA1.woff")
        format("woff");
      font-weight: normal;
      font-style: normal;
    }
    font-family: "InfinitySans-RegularA1";
    position: absolute;
    top: 24rem;
    padding: 0.5rem 2rem;
    font-size: 1.5rem;
    background-color: #3a3f51;
    color: #ff8a00;
    border: 0px;
    border-radius: 5px;
    :hover {
      cursor: pointer;
      background-color: #ff8a00;
      color: #252a3c;
    }
  }
`;

const ErrMsg = styled.div`
  margin: 0.5rem 0 0.5rem 1.5rem;
  color: red;
  font-size: 0.8rem;
  @media only screen and (min-width: 768px) {
    margin: 0.5rem 0 2.5rem 14.3rem;
    font-size: 1rem;
  }
`;

const DeleteOauth = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = state.loginUserInfo;

  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState({});
  const [delAcc, setDelAcc] = useState();
  const [checkDel, setCheckDel] = useState();

  const [message, setMessage] = useState();
  const [emptyPwd, setEmptyPwd] = useState(false);
  const [wrongPwd, setWrongPwd] = useState(false);

  const inputPwd = (e) => {
    setMessage(e.target.value);
    setEmptyPwd(false);
    setWrongPwd(false);
  };

  const handleClick = () => {
    setOpen(!open);
    setCheckDel(!checkDel);
  };

  const logoutHandler = () => {
    axios
      .post("/auth/logout", { id })
      .then(() => {
        const loginUserInfo = {
          email: "",
          nickname: "",
          profile: "",
        };
        dispatch(setLoginUserInfo(loginUserInfo));
        alert("????????? ???????????? ???????????? ???????????????. ????????? ????????????.");
        dispatch(setIsLogin(false));
        window.location.href = "/main";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SuccessDel = () => {
    axios
      .post("/oauth/delete", {
        message,
      })
      .then(() => {
        const loginUserInfo = {
          email: "",
          nickname: "",
          profile: "",
        };
        setAlertMsg({
          message: "??????????????? ?????????????????????. ????????? ?????????????????? ???????????????.",
          button: "??????",
        });
        setDelAcc(true);
        setOpen(true);
        setCheckDel(!checkDel);
        dispatch(setLoginUserInfo(loginUserInfo));
        dispatch(setIsLogin(false));
      })
      .catch((err) => {
        setOpen(!open);
        setCheckDel(!checkDel);
        if (
          err.response &&
          err.response.status === 401 &&
          state.isLogin === true
        ) {
          logoutHandler();
        }
        if (err.response.status === 400) {
          setWrongPwd(true);
        }
      });
  };

  const delAccount = () => {
    if (!message) {
      setEmptyPwd(true);
    } else {
      setAlertMsg({
        message: "????????? ??????????????? ???????????????????",
        button: "??????",
      });
      setOpen(!open);
      setCheckDel(!checkDel);
    }
  };

  return (
    <StyledBody>
      {open ? (
        <AlertModal
          alertMsg={alertMsg}
          handleClick={handleClick}
          delAcc={delAcc}
          checkDel={checkDel}
          SuccessDel={SuccessDel}
        />
      ) : null}
      <DeleteLabel>?????? ??????</DeleteLabel>
      <StyledForm>
        <PasswordInput>
          <div>????????? ??????????????? '????????????'??? ??????????????????</div>
          <input type="text" placeholder="????????????" onChange={inputPwd} />
        </PasswordInput>
        <ErrMsg>
          {emptyPwd ? <div>???????????? ???????????????</div> : null}
          {wrongPwd ? <div>????????? ???????????????</div> : null}
        </ErrMsg>

        <DeleteButton>
          <button onClick={delAccount}>??????</button>
        </DeleteButton>
      </StyledForm>
    </StyledBody>
  );
};

export default DeleteOauth;
