import * as React from 'react';
import styled from 'styled-components';
import { Cell } from './Cell';
import { boardEntity } from './mobx/Store';
import { observer } from 'mobx-react';

interface IProps {}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: gray;
  width: 300px;
  height: 300px;
  padding: 2px;
`;

const Row = styled.div`
  flex: 1;

  display: flex;
  flex-direction: row;
`;

@observer
class Board extends React.Component<IProps> {
  render() {
    console.log(boardEntity.cells);
    return (
      <Container>
        {boardEntity.cells.map((r, i) => (
          <Row key={i}>{r.map((c, j) => <Cell key={j} entity={c} />)}</Row>
        ))}
      </Container>
    );
  }
}

export { Board };
