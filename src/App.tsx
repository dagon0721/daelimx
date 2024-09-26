import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Home from "./screens/home";
import Profile from "./screens/profile";
import SigninScreen from "./screens/signin-screen";
import SignupScreen from "./screens/signup-screen";
import reset from "styled-reset";

//react-router-dom을 활용한 Page 관리
// - Page : home, Profile, signin, signup
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SigninScreen />,
  },
  {
    path: "/signup",
    element: <SignupScreen />,
  },
]);

// const Container = styled.div`
//   background-color: black;
//   width: 100vw;
//   height: 100vh;
// `;

// const name = "김";
// `내 이름은 ${name}이야`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <Container className="App">
      <GlobalStyle />
      <RouterProvider router={router}></RouterProvider>
    </Container>
  );
}

export default App;

// 전체 CSS 스타일을 Reset
const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    background-color: black;
    color: white;
  }
`;
