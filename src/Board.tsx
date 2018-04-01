import * as React from 'react';
import styled from 'styled-components';
import { Cell } from './Cell';
import { observer } from 'mobx-react';
import { Game, BoardEntity } from './mobx/Store';

interface IProps {
  entity: BoardEntity;
  game: Game;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

@observer
class Board extends React.Component<IProps> {
  render() {
    const entity = this.props.entity;
    const game = this.props.game;
    return (
      <Container>
        {entity.cells.map((r, i) => (
          <Row key={i}>
            {r.map((c, j) => <Cell key={j} x={i} y={j} entity={c} game={game} />)}
          </Row>
        ))}
      </Container>
    );
  }
}

export { Board };
