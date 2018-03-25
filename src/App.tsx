import { hot } from 'react-hot-loader';
import * as React from 'react';
import styled from 'styled-components';
import { Board } from './Board';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-style: bold;
`;

const Info = styled.div`
  font-size: 20px;
`;

class App extends React.Component {
  render() {
    return (
      <Container>
        <Title>Mine Sweeper</Title>
        <Info>Info</Info>
        <Board />
      </Container>
    );
  }
}

let exported = App;
if (process.env.NODE_ENV !== 'production') {
  exported = hot(module)(App);
}

export { exported as App };
