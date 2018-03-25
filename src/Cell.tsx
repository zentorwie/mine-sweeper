import * as React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { CellEntity, CellStatus } from './mobx/Store';
import { observer } from 'mobx-react';

interface IProps {
  text?: string;
  className?: string;
  entity: CellEntity;
}

const NotExposed = styled.div`
  flex: 1;
  background-color: white;
`;

const Exposed = styled.div`
  flex: 1;
  background-color: #ccc;
`;

@observer
class Cell extends React.Component<IProps> {
  handleClick = () => {
    console.log('Click!');
    const entity = this.props.entity;
    entity.neiborMine += 1;
    if (entity.status === CellStatus.DEFAULT) {
      entity.status = CellStatus.EXPOSED;
    } else {
      entity.status = CellStatus.DEFAULT;
    }
  };

  handleRightClick = (e) => {
    e.preventDefault();
    console.log('Right Click!');
  };

  render() {
    console.log('Render cell');
    const entity = this.props.entity;
    return (
      <div
        className={this.props.className}
        onContextMenu={this.handleRightClick}
        onClick={this.handleClick}
      >
        {entity.status === CellStatus.EXPOSED ? (
          <Exposed>{entity.neiborMine}</Exposed>
        ) : (
          <NotExposed>{entity.neiborMine}</NotExposed>
        )}
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
  border: solid 1px black;
  text-align: center;
  font-size: 150%;
  user-select: none;
`;

export { CellStyled as Cell };
