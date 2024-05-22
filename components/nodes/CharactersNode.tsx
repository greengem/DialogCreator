'use client';
import { NodeTemplate, NodeBody, NodeHeading } from './NodeTemplate';
import { TextField, Button } from '@radix-ui/themes';
import { IconX } from '@tabler/icons-react';
import { useState, useEffect, ChangeEvent } from 'react';
import { NodeProps, useReactFlow, useUpdateNodeInternals } from 'reactflow';

export default function CharactersNode({ id, data }: NodeProps) {
  const [characters, setCharacters] = useState<string[]>(data.characters || ['Character 1', 'Character 2', 'Character 3']);
  const [newCharacter, setNewCharacter] = useState<string>('');
  const updateNodeInternals = useUpdateNodeInternals();
  const { setNodes } = useReactFlow();

  const handleAddCharacter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCharacter.trim() !== '') {
      const updatedCharacters = [...characters, newCharacter.trim()];
      setCharacters(updatedCharacters);
      setNewCharacter('');
    }
  };

  const handleRemoveCharacter = (index: number) => {
    const updatedCharacters = characters.filter((_, i) => i !== index);
    setCharacters(updatedCharacters);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCharacter(e.target.value);
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
              characters,
            },
          };
        }
        return node;
      })
    );
  }, [characters, id, updateNodeInternals, setNodes]);

  return (
    <NodeTemplate color='bg-cyan-700' size='md'>
      <NodeHeading title='Characters' />
      <NodeBody>
        <form onSubmit={handleAddCharacter}>
          <TextField.Root
            placeholder="Add a character…"
            value={newCharacter}
            className='nodrag'
            onChange={handleChange}
          />
        </form>

        {characters.length > 0 && (
          <ul>
            {characters.map((character, index) => (
              <li key={index} className='flex justify-between py-2'>
                <p>{character}</p>
                <IconX size={16} onClick={() => handleRemoveCharacter(index)} className="cursor-pointer nodrag" />
              </li>
            ))}
          </ul>
        )}
      </NodeBody>
    </NodeTemplate>
  );
}
