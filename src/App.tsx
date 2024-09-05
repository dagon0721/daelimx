import React from 'react';
import styled from 'styled-components';

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
      {/* 내용이 비어 있지만, 여기에 컴포넌트를 추가할 수 있습니다 */}
    </Container>
  );
}

export default App;
