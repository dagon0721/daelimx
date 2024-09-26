import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 10px 20px;
  color: black;
  font-weight: bold;
  cursor: pointer;
`;

export default () => {
  // Google 로그인 진행하기 feat.Server(Firebase)
  const navigation = useNavigate(); //Hook
  const onClick = async () => {
    try {
      // 1. provier 생성 (Google 로그인을 위한 제공자)
      const provider = new GoogleAuthProvider();
      // 2. Google 로그인 창 띄우기 (server,,, 시간 차.. 비동기화.. async await)
      await signInWithPopup(auth, provider);
      // 3. 로그인 성공 시, Home 화면으로 이동
      navigation("/");
    } catch (e) {
      console.log(e);
      //만일 Firebase 에러라면 알람
      if (e instanceof FirebaseError) {
        alert(e.message);
      }
    }
  };
  return <Container onClick={onClick}>Google 계정으로 로그인하기</Container>;
};
