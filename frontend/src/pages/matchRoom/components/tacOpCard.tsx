import styled from 'styled-components';
import { TacOp } from '../../../types/data';
import { useEffect } from 'react';

export function TaCOpCard({
  tacOp,
  selected,
  setSelected
}: {
  tacOp: TacOp;
  selected: string | null;
  setSelected: (arg: string) => void;
}) {
  useEffect(() => {
    const card = document.getElementById(`${tacOp.name}`);
    card?.addEventListener('click', () => setSelected(tacOp.name));

    return () => {
      card?.removeEventListener('click', () => setSelected(tacOp.name));
    };
  }, []);

  return (
    <Card id={tacOp.name} $name={tacOp.name} $selected={selected}>
      <h4>{tacOp.name}</h4>
      {tacOp.no_cq && (
        <span className="unavailable">Unavailable in Close Quarters</span>
      )}
      <Description>
        {tacOp.text.map((parag, i) => (
          <p key={i}>{parag}</p>
        ))}
      </Description>
      {tacOp.action && (
        <Action>
          <div>
            <h5>{tacOp.action.actionName}</h5>
            <span>{tacOp.action.cost}</span>
          </div>
          <p>{tacOp.action.text}</p>
        </Action>
      )}
    </Card>
  );
}

const Card = styled.section<{ $name: string; $selected: string | null }>`
  display: flex;
  flex-direction: column;
  background: #dde;
  height: 100%;
  padding: 20px;
  gap: 10px;
  border-radius: 5px;
  box-shadow: ${(props) => props.theme.shadow.softDarkBottom};
  border: ${(props) =>
    props.$name === props.$selected
      ? `4px solid HSL(${props.theme.colors.tertiary})`
      : '4px solid transparent'};

  h4 {
    border-bottom: 1px solid black;
    padding-bottom: 10px;
  }
  p {
    color: black;
    margin-bottom: 15px;
  }

  .unavailable {
    border: 3px dashed red;
    padding: 7px;
    color: red;
    font-weight: 600;
  }
`;
const Description = styled.div`
  & > p {
  }
`;
const Action = styled.section`
  background: white;
  border: 1px solid black;
  & > * {
    padding: 10px;
  }
  & div {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
  }
  & h5,
  span {
    font-size: 1rem;
    font-weight: 700;
  }
`;
