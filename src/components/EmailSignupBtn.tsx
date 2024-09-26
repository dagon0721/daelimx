import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background-color: #2379c5;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
`;

export default () => {
  // 회원가입 페이지(signup)로 이동하기
  const navigation = useNavigate();

  // 회원가입 페이지 이동 버튼
  const onClick = () => {
    navigation("/signup");
  };
  return <Container onClick={onClick}>이메일로 회원가입하기</Container>;
};
