// 게시글을 작성하고, Server(Firebase)에 업로드 하는 컴포넌트

import { useRef, useState } from "react";
import styled from "styled-components";
import { auth, firestore } from "../firebaseConfig";
import { Post } from "../types/postInput.type";
import { addDoc, collection } from "firebase/firestore";

const Form = styled.form`
  display: flex;
  gap: 10px;
  border: 1px solid #1d1d1d;
  padding: 20px 5px;
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
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 20px;
  font-weight: bold;
  &:focus {
    outline: none;
    border-color: #4e68f8;
  }
  &::placeholder {
    color: #1f1f1f;
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
  // 1-a. TextArea의 정보를 담을 Ref 생성
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 2. 작성한/변경된 텍스트를 State에 저장
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 1. 텍스트 변경 시 발생하는 Event에서 value 값 가져옴
    const value = e.target.value;
    // const {
    //   target: { value },
    // } = e;
    // 2. value 값을 state에 저장
    setPost(value);
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용에 맞게 높이 조절
    }
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
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // -------- Loading Start --------
    try {
      // 0. [방어코드] : 로그인하지 않았거나, 게시글 내용이 없거나.. 실행 X
      const user = auth.currentUser;
      if (user === null || post === "") {
        return;
      }
      // 1. Firebase에 전달할 정보가 필요
      //    ㄴ 1-a. 게시글내용, 1-b. 이미지
      //
      // 2. Firebase에 전달할 정보를 담은 객체(Object) 생성
      //  - 게시글 내용
      //  - 게시글 작성(생성) 시간
      //  - 게시글 작성자 닉네임(user)
      //  - 게시글 작성자 uid
      //  - 이미지
      const myPost: Post = {
        post: post,
        createdAt: Date.now(), // UTC Time
        nickname: user?.displayName || "익명",
        userId: user.uid,
      };
      // 3. Firebase에 전달
      await addDoc(collection(firestore, "posts"), myPost);
    } catch (error) {
      // ------- Error 발생 시, 예외처리 ------
      console.error();
    } finally {
      // -------- Loading End --------
    }
  };

  // Page Design Rendering
  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <Profile></Profile>
      <PostArea>
        <TextArea ref={textareaRef} rows={3} onChange={onChange} maxLength={200} placeholder="무슨 일이 일어나고 있나요?" />
        <BottomMenu>
          <AttachFileButton htmlFor="file">{file ? "업로드완료" : "사진업로드"}</AttachFileButton>
          <AttachFileInput onChange={(e) => onChangeFile(e)} type="file" id="file" accept="image/*" />
          <SubmitButton type={"submit"} value={"작성하기"} />
        </BottomMenu>
      </PostArea>
    </Form>
  );
};
