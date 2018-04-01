import * as React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { Game, CellEntity, CellStatus } from './mobx/Store';
import { observer } from 'mobx-react';

interface IProps {
  text?: string;
  className?: string;
  entity: CellEntity;
  game: Game;
  x: number;
  y: number;
}

const NotExposed = styled.div`
  flex: 1;
  border-radius: 6px;
  background-color: #92b4f4;
`;

const Exposed = NotExposed.extend`
  background-color: #fff;
`;

@observer
class Cell extends React.Component<IProps> {
  handleClick = () => {
    console.log('Click!');
    const { game, x, y } = this.props;
    game.exposeCell(x, y);
  };

  handleRightClick = e => {
    e.preventDefault();
    console.log('Right Click!');
  };

  render() {
    console.log('Render cell');
    const entity = this.props.entity;

    let cell =
      entity.status === CellStatus.EXPOSED ? (
        entity.isMine ? (
          <Exposed>*</Exposed>
        ) : (
          <Exposed>{entity.neiborMine > 0 ? entity.neiborMine : ' '}</Exposed>
        )
      ) : (
        <NotExposed />
      );

    if (entity.status === CellStatus.EXPOSED) {
      if (entity.isMine) {
        cell = <Exposed>*</Exposed>;
      } else {
        cell = <Exposed>{entity.neiborMine > 0 && entity.neiborMine}</Exposed>;
      }
    } else if (entity.status === CellStatus.MARKED) {
      cell = <NotExposed>+</NotExposed>;
    } else {
      cell = <NotExposed />;
    }

    return (
      <div
        className={this.props.className}
        onContextMenu={this.handleRightClick}
        onClick={this.handleClick}
      >
        {cell}
      </div>
    );
  }
}

const CellStyled = styled(Cell)`
  :hover {
    cursor: pointer;
  }
  display: flex;
  flex: 1;
  margin: 2px;
  text-align: center;
  color: black;
  font-size: 16px;
  flex-direction: column;
  user-select: none;
  width: 24px;
  height: 24px;

  user-select: none;
`;

export { CellStyled as Cell };
