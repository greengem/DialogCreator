'use client';
import React, { memo, useState, useEffect } from 'react';
import { Position, useUpdateNodeInternals, NodeProps, useReactFlow } from 'reactflow';
import { NodeTemplate, NodeBody, NodeHeading } from './NodeTemplate';
import { Button, Select, TextArea, TextField } from '@radix-ui/themes';
import { IconX } from '@tabler/icons-react';
import { CustomHandle, CustomHandleNested } from '../CustomHandle';

interface Choice {
  id: number;
  text: string;
  handleId: string;
}

export function MessageNode({ id, data }: NodeProps) {
  const [character, setCharacter] = useState(data.character || 'Player');
  const [message, setMessage] = useState(data.message || '');
  const [choices, setChoices] = useState<Choice[]>(data.choices || []);
  const updateNodeInternals = useUpdateNodeInternals();
  const { setNodes, getNodes } = useReactFlow();

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
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              character,
              message,
              choices,
            },
          };
        }
        return node;
      })
    );
  }, [choices, id, updateNodeInternals, character, message, setNodes]);

  // Retrieve characters from the characters node
  const characterNode = getNodes().find(node => node.type === 'characters');
  const characters = characterNode ? characterNode.data.characters : [];

  return (
    <NodeTemplate color='bg-purple-700' size='md'>
      <NodeHeading title='Show Message' />
      <NodeBody>
        <CharacterSelect character={character} setCharacter={setCharacter} characters={characters} />
        <TextArea 
          placeholder="I'm not arguing, I'm just explaining why I'm right.." 
          size="1" 
          className='nodrag h-32' 
          resize="vertical" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
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

interface CharacterSelectProps {
  character: string;
  setCharacter: (character: string) => void;
  characters: string[];
}

function CharacterSelect({ character, setCharacter, characters }: CharacterSelectProps) {
  return (
    <Select.Root value={character} onValueChange={setCharacter}>
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
      <Button variant='outline' className='bg-purple-500 nodrag' color='purple' onClick={addChoice}>Add Choice</Button>
      {choices.length > 0 && (
        <ul className='flex flex-col gap-y-3'>
          {choices.map((choice) => (
            <li key={choice.id} className='flex gap-2 items-center relative'>
              <button className='shrink-0 grow-0 nodrag text-red-500' onClick={() => removeChoice(choice.id)}><IconX size={16} /></button>
              <TextField.Root 
                placeholder="Choice.." 
                className='grow nodrag' 
                value={choice.text} 
                onChange={(e) => handleTextChange(choice.id, e.target.value)}
              />
              <CustomHandleNested type='source' position={Position.Right} ringColor='ring-purple-500' id={choice.handleId} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
