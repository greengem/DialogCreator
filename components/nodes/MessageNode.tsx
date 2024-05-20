'use client'
import React, { memo, useState, useEffect } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { NodeTemplate, NodeBody, NodeHeading } from './NodeTemplate';
import { Button, Select, TextArea, TextField } from '@radix-ui/themes';
import useCharacterStore from '@/data/useCharacterStore';
import { IconX } from '@tabler/icons-react';
import { CustomHandle, CustomHandleNested }  from '../CustomHandle';

interface Choice {
  id: number;
  text: string;
  handleId: string;
}

export function MessageNode({ id }: { id: string }) {
  const [choices, setChoices] = useState<Choice[]>([]);
  const updateNodeInternals = useUpdateNodeInternals();

  const addChoice = () => {
    const newChoice = {
      id: Date.now(),
      text: '',
      handleId: `handle-${Date.now()}`
    };
    setChoices([...choices, newChoice]);
  };

  const removeChoice = (id: number) => {
    setChoices(choices.filter(choice => choice.id !== id));
  };

  const handleTextChange = (id: number, text: string) => {
    setChoices(choices.map(choice => (choice.id === id ? { ...choice, text } : choice)));
  };

  useEffect(() => {
    updateNodeInternals(id);
  }, [choices, id, updateNodeInternals]);

  return (
    <NodeTemplate color='bg-purple-500' size='md'>
      <NodeHeading title='Show Message' />
      <NodeBody>
        <CharacterSelect />
        <TextArea placeholder="I'm not arguing, I'm just explaining why I'm right.." size="1" className='nodrag h-64' resize="vertical" />
        <Choices 
          choices={choices} 
          addChoice={addChoice} 
          removeChoice={removeChoice} 
          handleTextChange={handleTextChange} 
        />
      </NodeBody>
      <CustomHandle type='target' position={Position.Left} ringColor='ring-purple-500' />
      {choices.length === 0 && (
        <CustomHandle type='source' position={Position.Right} ringColor='ring-purple-500' />
      )}
    </NodeTemplate>
  );
}

export default memo(MessageNode);

function CharacterSelect() {
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

interface ChoicesProps {
  choices: Choice[];
  addChoice: () => void;
  removeChoice: (id: number) => void;
  handleTextChange: (id: number, text: string) => void;
}

function Choices({ choices, addChoice, removeChoice, handleTextChange }: ChoicesProps) {
  return (
    <>
      <Button className='bg-purple-500 nodrag' color='purple' onClick={addChoice}>Add Choice</Button>
      {choices.length > 0 && (
        <ul className='flex flex-col gap-y-3'>
          {choices.map((choice, index) => (
            <li key={choice.id} className='flex gap-2 items-center relative'>
              <Button color='red' className='shrink-0 grow-0 nodrag' onClick={() => removeChoice(choice.id)}><IconX size={16} /></Button>
              <TextField.Root 
                placeholder="Choice.." 
                className='grow nodrag' 
                value={choice.text} 
                onChange={(e) => handleTextChange(choice.id, e.target.value)}
              />
              <CustomHandleNested type='source' position={Position.Right} ringColor='ring-purple-500' />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
