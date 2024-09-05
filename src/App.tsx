import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import styled from 'styled-components';
import Home from './screens/home';
import Profile from './screens/profile';
import SigninScreen from './screens/signin-screen';
import SignupScreen from './screens/signup-screen';

//react-router-dom을 활용한 Page 관리
// - Page : home, Profile, signin, signup
const router = createBrowserRouter([{
  path:"/",
  children:[
    {
      path:"",
      element:<Home/>
    },{
      path:"profile",
      element:<Profile/>
    }
  ]
},{
  path:"/signin",
  element:<SigninScreen/>
},{
  path:"/signup",
  element:<SignupScreen/>
}]);

// const Container = styled.div`
//   background-color: black;
//   width: 100vw;
//   height: 100vh;
// `;

const Container = styled.div`
  background-color: orange;
  width:100vw;
  height:100vh;
`;

function App() {
  return (
    <Container className="App">
      <RouterProvider router={router}></RouterProvider>
    </Container>
  );
}

export default App;
