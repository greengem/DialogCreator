'use client'
import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { NodeTemplate, NodeBody, NodeHeading } from './NodeTemplate';
import { Button, Select, TextArea, TextField } from '@radix-ui/themes';
import useCharacterStore from '@/data/useCharacterStore';

interface Choice {
  id: number;
  text: string;
}

const MessageNode: React.FC = () => {
  const [choices, setChoices] = useState<Choice[]>([{ id: 1, text: '' }]);
  
  const addChoice = () => {
    setChoices([...choices, { id: Date.now(), text: '' }]);
  };

  const removeChoice = (id: number) => {
    setChoices(choices.filter(choice => choice.id !== id));
  };

  const handleTextChange = (id: number, text: string) => {
    setChoices(choices.map(choice => (choice.id === id ? { ...choice, text } : choice)));
  };

  return (
    <NodeTemplate color='bg-purple-500' size='xl'>
      <NodeHeading title='Show Message' />
      <NodeBody nodeInput nodeOutput>
        <CharacterSelect />
        <TextArea placeholder="They walked into a wall.." />
        <Button onClick={addChoice}>Add Choice</Button>
        <ul className='flex flex-col gap-y-3'>
          {choices.map(choice => (
            <li key={choice.id} className='flex gap-3'>
              <Button className='shrink-0 grow-0' onClick={() => removeChoice(choice.id)}>X</Button>
              <TextField.Root 
                placeholder="Choice.." 
                className='grow' 
                value={choice.text} 
                onChange={(e) => handleTextChange(choice.id, e.target.value)}
              />
            </li>
          ))}
        </ul>
      </NodeBody>
      <Handle type="target" position={Position.Left} className="w-2 h-2 rounded-full !bg-zinc-600 ring-2 ring-purple-500 ml-3" />
      <Handle type="source" position={Position.Right} className="w-2 h-2 rounded-full !bg-zinc-600 ring-2 ring-purple-500 mr-3" />
    </NodeTemplate>
  );
}

export default memo(MessageNode);

const CharacterSelect: React.FC = () => {
  const { characters } = useCharacterStore();

  return (
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
  );
}
