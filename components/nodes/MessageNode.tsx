import React, { memo, useState, useEffect, useCallback } from 'react';
import { Position, useUpdateNodeInternals, NodeProps, useReactFlow } from 'reactflow';
import { NodeTemplate, NodeBody, NodeHeading } from './NodeTemplate';
import { Button, Select, TextArea, TextField } from '@radix-ui/themes';
import { IconX } from '@tabler/icons-react';
import { CustomHandle, CustomHandleNested } from '../CustomHandle';
import { v4 as uuidv4 } from 'uuid';

interface Choice {
  id: string;
  text: string;
  handleId: string;
}

export function MessageNode({ id, data }: NodeProps) {
  const [character, setCharacter] = useState(data.character || 'Player');
  const [message, setMessage] = useState(data.message || '');
  const [choices, setChoices] = useState<Choice[]>(data.choices || []);
  const updateNodeInternals = useUpdateNodeInternals();
  const { setNodes, setEdges, getNodes, getEdges } = useReactFlow();

  const addChoice = useCallback(() => {
    const newChoice = {
      id: uuidv4(),
      text: '',
      handleId: uuidv4()
    };
    setChoices((prevChoices) => {
      const updatedChoices = [...prevChoices, newChoice];
      updateNodeInternals(id); // Update node internals after adding choice
      return updatedChoices;
    });
  }, [id, updateNodeInternals]);

const removeChoice = useCallback((choiceId: string) => {
  // Get the handleId of the choice
  const choice = choices.find(choice => choice.id === choiceId);
  const handleId = choice ? choice.handleId : null;

  // First update the edges
  setEdges((prevEdges) => {
    const updatedEdges = prevEdges.filter(edge => edge.sourceHandle !== handleId && edge.targetHandle !== handleId);
    updateNodeInternals(id); // Update node internals after removing edges
    return updatedEdges;
  });

  // Then update the choices
  setChoices((prevChoices) => {
    const updatedChoices = prevChoices.filter(choice => choice.id !== choiceId);
    updateNodeInternals(id); // Update node internals after removing choice
    return updatedChoices;
  });
}, [id, setEdges, updateNodeInternals, choices]);

  useEffect(() => {
    updateNodeInternals(id);
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
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
  }, [choices, character, message, id, updateNodeInternals, setNodes]);

  const handleTextChange = useCallback((choiceId: string, text: string) => {
    setChoices((prevChoices) => {
      const updatedChoices = prevChoices.map(choice => (choice.id === choiceId ? { ...choice, text } : choice));
      updateNodeInternals(id); // Update node internals after changing text
      return updatedChoices;
    });
  }, [id, updateNodeInternals]);

  // Retrieve characters from the characters node
  const characterNode = getNodes().find(node => node.type === 'characters');
  const characters = characterNode ? characterNode.data.characters : [];

  return (
    <NodeTemplate color='bg-purple-700' size='md'>
      <NodeHeading title='Show Message'/>
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
  removeChoice: (id: string) => void;
  handleTextChange: (id: string, text: string) => void;
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
