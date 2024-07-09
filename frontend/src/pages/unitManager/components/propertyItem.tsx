import styled from 'styled-components';

export function PropertyItem() {
  return (
    <ItemContainer>
      <ItemName>Name</ItemName>
      <RemoveButton type="button">Del</RemoveButton>
    </ItemContainer>
  );
}

const ItemContainer = styled.section`
  background: #ddd;
  display: flex;
  align-items: center;
  border-radius: 5px;
`;
const ItemName = styled.p`
  margin-left: 4px;
  width: 100%;
`;
const RemoveButton = styled.button``;
