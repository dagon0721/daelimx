// 게시글을 작성하고, Server(Firebase)에 업로드 하는 컴포넌트

import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  gap: 10px;
  border: 1px solid white;
  padding: 20px 5px;
  width: 50%;
`;
const Profile = styled.div`
  background-color: tomato;
  /* width: 30px; */
`;
const PostArea = styled.div`
  flex: 1;
`;
const TextArea = styled.textarea`
  padding: 10px;
  resize: none;
  background-color: black;
  color: white;
  width: 100%;
  box-sizing: border-box; // 여기에 추가
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &:focus {
    outline: none;
    border-color: #4e68f8;
  }
  &::placeholder {
    color: #1f1f1f;
    font-size: 10px;
  }
`;

const BottomMenu = styled.div`
  display: flex;
  justify-content: space-between;
`;
const AttachFileButton = styled.label`
  background-color: #175af4;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.8;
  }
`;
const AttachFileInput = styled.input`
  display: none;
`;
const SubmitButton = styled.input`
  background-color: #3972f5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.8;
  }
`;

export default () => {
  // Page Logic Rendering
  // 1. 작성한 텍스트, 업로드한 이미지
  const [post, setPost] = useState<string>("");
  const [file, setFile] = useState<File>();
  // 2. 작성한/변경된 텍스트를 State에 저장
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 1. 텍스트 변경 시 발생하는 Event에서 value 값 가져옴
    const value = e.target.value;
    // const {
    //   target: { value },
    // } = e;
    // 2. value 값을 state에 저장
    setPost(value);
  };

  // 3. 업로드한 이미지(File)를 State에 저장
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1. 발생한 Event에서 File 정보를 가져옴
    const files = e.target.files;
    // const {target: {files}} = e;
    // 2. [방어코드] : 가져온 File이 존재하는 경우
    // - 값이 들어가 있는지 확인 + 이미지가 1개 선택된 경우
    if (files && files.length === 1) {
      // 3. File 정보를 State에 저장
      setFile(files[0]);
    }
  };
  // 4. 작성한 게시글 정보를 Server(Firebase)에 업로드
  const onSubmit = () => {};

  // Page Design Rendering
  return (
    <Form>
      <Profile></Profile>
      <PostArea>
        <TextArea onChange={onChange} maxLength={200} placeholder="무슨 일이 일어나고 있나요?" />
        <BottomMenu>
          <AttachFileButton htmlFor="file">{file ? "업로드완료" : "사진업로드"}</AttachFileButton>
          <AttachFileInput onChange={(e) => onChangeFile(e)} type="file" id="file" accept="image/*" />
          <SubmitButton onSubmit={onSubmit} type={"submit"} value={"작성하기"} />
        </BottomMenu>
      </PostArea>
    </Form>
  );
};
