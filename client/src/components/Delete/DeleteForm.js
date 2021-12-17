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
    justify-content: center;
    div {
      display: flex;
      align-items: center;
      margin-right: 1rem;
      margin-bottom: 0;
      font-size: 1rem;
    }
    input {
      padding: 0.5rem;
      font-size: 1rem;
      width: 50%;
    }
  }
`;

const DeleteButton = styled.div`
  display: flex;
  justify-content: center;
  button {
    position: absolute;
    top: 22.5rem;
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

const DeleteForm = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = state.loginUserInfo;

  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState({});
  const [delAcc, setDelAcc] = useState();

  const [pwd, setPwd] = useState();
  const [emptyPwd, setEmptyPwd] = useState(false);
  const [wrongPwd, setWrongPwd] = useState(false);

  const inputPwd = (e) => {
    setPwd(e.target.value);
    setEmptyPwd(false);
    setWrongPwd(false);
  };

  const handleClick = () => {
    setOpen(!open);
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
        alert("세션이 만료되어 로그아웃 되었습니다. 로그인 해주세요.");
        dispatch(setIsLogin(false));
        window.location.href = "/main";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const delAccount = () => {
    if (!pwd) {
      setEmptyPwd(true);
    } else {
      axios
        .post("/user", {
          password: pwd,
        })
        .then(() => {
          const loginUserInfo = {
            email: "",
            nickname: "",
            profile: "",
          };
          setAlertMsg({
            message:
              "회원탈퇴가 완료되었습니다. 그동안 이용해주셔서 감사합니다.",
            button: "확인",
          });
          setDelAcc(true);
          setOpen(!open);
          dispatch(setLoginUserInfo(loginUserInfo));
          dispatch(setIsLogin(false));
        })
        .catch((err) => {
          console.log(err);
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
    }
  };

  console.log(pwd);

  return (
    <StyledBody>
      {open ? (
        <AlertModal
          alertMsg={alertMsg}
          handleClick={handleClick}
          delAcc={delAcc}
        />
      ) : null}
      <DeleteLabel>회원 탈퇴</DeleteLabel>
      <StyledForm>
        <PasswordInput>
          <div>비밀번호</div>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={inputPwd}
          />
        </PasswordInput>
        <ErrMsg>
          {emptyPwd ? <div>비밀번호를 입력해주세요</div> : null}
          {wrongPwd ? <div>잘못된 비밀번호입니다.</div> : null}
        </ErrMsg>

        <DeleteButton>
          <button onClick={delAccount}>탈퇴</button>
        </DeleteButton>
      </StyledForm>
    </StyledBody>
  );
};

export default DeleteForm;
