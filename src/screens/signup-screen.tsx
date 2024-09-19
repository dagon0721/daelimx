// signup 화면을 구성
import { useState } from "react";
import styled from "styled-components";

// styled-component를 통한 css구성
const Container = styled.div`
    height : 100%;
    display : flex;
    flex-direction: column;
    width : 300px;
    padding : 30px;
`;

// 화면 타이틀 텍스트
const Title = styled.h1`color: white`;

// 화면 타이틀 로고(이미지)
const Logo = styled.img``;

// ID/PW Input Field(Form)
// ㄴ1. Form (텍스트 인풋 필드를 담을 공간)
const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
`;

// ㄴ2. 각각(id, pw)의 Input Field
const Input = styled.input`
    padding : 10px 15px;
    border-radius:10px;
    border : none;
    width : 100%;
    &::placeholder{
        font-size: 0.8em;
    }
    &[type="submit"]{
        margin-top: 30px;
        cursor:pointer;
    }
`;
const InputTitle = styled.p`
    color: white;
    font-size: 10px;
`;

// 실제 페이지를 구성하는 code

export default()=>{
    
    // 회원가입을 하기 위한 Process 코드작성
    // A. 회원정보를 저장할 데이터(State) - useStateHook
    //const [값을저장할데이터,데이터의값을 변경하는 함수] = useState();
    const [nickname,setNickName] = useState(""); // Name
    
    const [email,setEmail] = useState(""); // Email 
    
    const [password,setPassword] = useState(""); // Password
    
    const [loading, setLoading] = useState(); // Loading
    
    const [error, setError] = useState(); // Error

    // B. 회원정보를 입력할 때 실행, (닉네임 중복, 아무것도 입력안했을 때 등 유저가 입력한 정보 가공/수정)
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        // 0.입력된 정보에서 값(입력위치, 입력값)을 알아야 한다.
        //const name = e.target.name;// ㄴ 입력위치
        //const value = e.target.value;// ㄴ 입력값
        // 1.어디서 입력된 정보(event)인지 알아야한다.
        const {target:{name,value}} = e;
        // 2.입력된 장소(name,email,pw)에 따라 각각 데이터(state)를 저장
        switch(name){
            case "name": setNickName(value); break;
            case "email": setEmail(value); break;
            case "password": setPassword(value); break;
        }
        // 3.저장한 데이터를 Page에 보여준다.

    };
    // C. 회원강비 버튼 눌렀을 때, 실행(입력한 정보 전달)
    const onSubmit = ()=>{
        // A. 방어코드: 잘못 입력 시, 제출하지 않고 STOP
        // B. 회원가입 프로세스 진행
        // b-1. 로딩 시작 ...
        // b-2. 사용자가 입력한 전달할 데이터 확인
        // b-3. API를 통해서 Server에 값(입력한 회원정보)을 전달
        // b-4. 서버에서.... 저장 중...
        // b-5. 로그인 화면으로 이동 or 자동 로그인 => 홈화면
        // error-- 통신X, 중복된 이메일, 잘못된 PW
        // - 에러 메시지 출력
        // ALWAYS 프로세스 끝나면, 로딩 종료 ...
    };

    //위에 onChange랑 다름 ex) 내꺼 니꺼 폰 기종은 같아도 다름
    return <Container>
        <Logo />
        <Title>회원가입</Title>
        <Form>
            <InputTitle>닉네임*</InputTitle>
            <Input onChange={(e)=>onChange(e)} name="name" type="text" placeholder="예) Daelim" value={nickname}/>
            <InputTitle>이메일*</InputTitle>
            <Input onChange={onChange} name="email" type="email" placeholder="예) Daelim@daelim.ac.kr" value={email}/>
            <InputTitle>비밀번호*</InputTitle>
            <Input onChange={onChange} name="password" type="password" placeholder="예) *********" value={password}/>
            <Input onSubmit={onSubmit} type="submit" value={"회원가입"}/>
        </Form>
    </Container>
}

