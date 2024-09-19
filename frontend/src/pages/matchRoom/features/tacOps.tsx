import { useEffect, useRef, useState } from 'react';
import { ArchetypeSelector } from '../components/archetypeSelector';
import { useGetTacOps } from '../hooks/useGetTacOps';
import styled from 'styled-components';
import { TaCOpCard } from '../components/tacOpCard';

export function TacOpsSelection() {
  const tacOps = useGetTacOps();
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(
    null
  );
  const [selectedTacOp, setSelectedTacOp] = useState<string | null>(null);
  const ref = useRef<null | object>(null);

  useEffect(() => {
    ref.current = tacOps;
    console.log(ref.current);
  }, [tacOps]);

  return (
    <>
      <ArchetypeSelector
        setArchetype={(arg: string) => setSelectedArchetype(arg)}
      />
      <TacOpCards>
        {tacOps?.data?.map((tacOp) => {
          if (tacOp.archetype === selectedArchetype)
            return (
              <li key={tacOp.name}>
                <TaCOpCard
                  tacOp={tacOp}
                  selected={selectedTacOp}
                  setSelected={(arg: string) => setSelectedTacOp(arg)}
                />
              </li>
            );
        })}
      </TacOpCards>
    </>
  );
}

const TacOpCards = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;
