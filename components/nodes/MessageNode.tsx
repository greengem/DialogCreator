'use client'
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { NodeTemplate, NodeBody, NodeHeading } from './NodeTemplate';
import { Button, Select, TextArea, TextField } from '@radix-ui/themes';
import useCharacterStore from '@/data/useCharacterStore';


function MessageNode() {
 
  return (
    <NodeTemplate color='bg-purple-500' size='xl'>
      <NodeHeading title='Show Message' />
      <NodeBody nodeInput nodeOutput>
        <CharacterSelect />
        <TextArea placeholder="They walked into a wall.." />
        <Button>Add Choice</Button>
        <ul>
          <li className='flex gap-3'>
            <Button className='shrink-0 grow-0'>X</Button>
            <TextField.Root placeholder="Choice.." className='grow' />
          </li>
        </ul>
      </NodeBody>
      <Handle type="target" position={Position.Left} className="w-2 h-2 rounded-full !bg-zinc-600 ring-2 ring-purple-500 ml-3" />
      <Handle type="source" position={Position.Right} className="w-2 h-2 rounded-full !bg-zinc-600 ring-2 ring-purple-500 mr-3" />
    </NodeTemplate>
  );
}

export default memo(MessageNode);

function CharacterSelect() {
  const { characters } = useCharacterStore();

  return(
    <Select.Root defaultValue="Player">
      <Select.Trigger className='w-64' />
      <Select.Content className='w-full'>
        <Select.Group>
          <Select.Label>Characters</Select.Label>
          {characters.map((character, index) => (
            <Select.Item key={index} value={character}>
              {character}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}