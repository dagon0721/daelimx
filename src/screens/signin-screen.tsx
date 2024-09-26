// signup 화면을 구성
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import EmailSignupBtn from "../components/EmailSignupBtn";
import GoogleSignupBtn from "../components/GoogleSignupBtn";

// styled-component를 통한 css구성
const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  padding: 30px;
  /* 특정 화면 너비가 되었을 때 실행 */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// 화면 타이틀 텍스트
const Title = styled.h1`
  color: white;
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 60px;
`;

// 화면 타이틀 로고(이미지)
const Logo = styled.img`
  width: 100%;
  max-width: 550px;
  height: auto;
`;

// ID/PW Input Field(Form)
// ㄴ1. Form (텍스트 인풋 필드를 담을 공간)
const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  width: 400px;
`;

// ㄴ2. 각각(id, pw)의 Input Field
const Input = styled.input`
  padding: 10px 15px;
  border-radius: 10px;
  border: none;
  /* width: 100%; */
  &::placeholder {
    font-size: 0.8em;
  }
  &[type="submit"] {
    margin-top: 30px;
    cursor: pointer;
  }
`;
const InputTitle = styled.p`
  color: white;
  font-size: 8px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

// 로그인 버튼
const SignInBtn = styled.div`
  padding: 10px 15px;
  background-color: white;
  color: black;
  border-radius: 20px;
  /* width: 100%; */
  cursor: pointer;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
`;

// 에러 메시지 출력 컴포넌트
const ErrorMsg = styled.p`
  color: red;
  font-weight: 600;
  font-size: 10px;
  text-align: center;
`;

// 로그인 페이지 이동을 위한 Guide
const Guide = styled.div`
  text-align: center;
  /* margin-top: 30px; */
  font-size: 14px;
  a {
    color: #49eb08;
    font-weight: bold;
  }
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

//로그인 / 가입 버튼 구분
const Divder = styled.p`
  display: flex;
  color: white;
  align-items: center;
  text-align: center;
  font-size: 14px;
  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid white;
    margin: 30px 10px;
  }
`;

const GuideTitle = styled.p`
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 10px;
`;

// 실제 페이지를 구성하는 code
export default () => {
  // 회원가입을 하기 위한 Process 코드작성
  // 페이지 이동을 위한 Hook
  const navigation = useNavigate();

  // A. 회원정보를 저장할 데이터(State) - useStateHook
  //const [값을저장할데이터,데이터의값을 변경하는 함수] = useState();

  const [email, setEmail] = useState(""); // Email

  const [password, setPassword] = useState(""); // Password

  const [loading, setLoading] = useState(false); // Loading

  const [error, setError] = useState(""); // Error

  // B. 회원정보를 입력할 때 실행, (닉네임 중복, 아무것도 입력안했을 때 등 유저가 입력한 정보 가공/수정)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 0.입력된 정보에서 값(입력위치, 입력값)을 알아야 한다.
    //const name = e.target.name;// ㄴ 입력위치
    //const value = e.target.value;// ㄴ 입력값
    // 1.어디서 입력된 정보(event)인지 알아야한다.
    const {
      target: { name, value },
    } = e;
    // 2.입력된 장소(email,pw)에 따라 각각 데이터(state)를 저장
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
    // 3.저장한 데이터를 Page에 보여준다.
  };

  // 로그인 버튼 눌렀을 때 실행
  const onSubmit = async () => {
    if (email === "" || password === "") {
      alert("회원 정보를 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigation("/"); // 로그인 성공 시 홈 화면으로 이동
    } catch (e) {
      if (e instanceof FirebaseError) {
        // Firebase 에러 처리
        switch (e.code) {
          case "auth/user-not-found":
            setError("등록되지 않은 이메일입니다.");
            break;
          case "auth/wrong-password":
            setError("비밀번호가 올바르지 않습니다.");
            break;
          default:
            setError("로그인에 실패했습니다. 다시 시도해주세요.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  //위에 onChange랑 다름 ex) 내꺼 니꺼 폰 기종은 같아도 다름
  return (
    <Container>
      <Logo src={`${process.env.PUBLIC_URL}/DaelimX_Title.png`} />
      <Form>
        <Title>수업 째고 싶다</Title>
        <InputTitle>이메일*</InputTitle>
        <Input
          onChange={onChange}
          name="email"
          type="email"
          placeholder="예) Daelim@daelim.ac.kr"
          value={email}
        />
        <InputTitle>비밀번호*</InputTitle>
        <Input
          onChange={onChange}
          name="password"
          type="password"
          placeholder="예) *********"
          value={password}
        />
        <SignInBtn onClick={onSubmit}>
          {loading ? "로딩중..." : "로그인"}
        </SignInBtn>
        <ErrorMsg>{error}</ErrorMsg>
        <Divder>또는</Divder>
        <Guide>
          <GuideTitle>아직 계정이 없으신가요?</GuideTitle>
          <EmailSignupBtn />
          <GoogleSignupBtn />
        </Guide>
      </Form>
    </Container>
  );
};

/* <Form onSubmit={onSubmit}>
            <InputTitle>닉네임*</InputTitle>
            <Input onChange={(e)=>onChange(e)} name="name" type="text" placeholder="예) Daelim" value={nickName}/>
            <InputTitle>이메일*</InputTitle>
            <Input onChange={onChange} name="email" type="email" placeholder="예) Daelim@daelim.ac.kr" value={email}/>
            <InputTitle>비밀번호*</InputTitle>
            <Input onChange={onChange} name="password" type="password" placeholder="예) *********" value={password}/>
            <Input type="submit" value={loading === true ? "로딩중" : "회원가입"}/>
        </Form> */
