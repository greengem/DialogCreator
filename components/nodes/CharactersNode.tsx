'use client'
import { NodeTemplate, NodeBody, NodeHeading } from './NodeTemplate';
import { TextField, Button } from '@radix-ui/themes';
import { IconPlus, IconUser, IconX } from '@tabler/icons-react';
import { useState, ChangeEvent } from 'react';
import useCharacterStore from '@/data/useCharacterStore';

export default function CharactersNode() {
  const { characters, addCharacter, removeCharacter } = useCharacterStore();
  const [newCharacter, setNewCharacter] = useState<string>('');

  const handleAddCharacter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCharacter.trim() !== '') {
      addCharacter(newCharacter.trim());
      setNewCharacter('');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCharacter(e.target.value);
  };

  return (
    <NodeTemplate color='bg-cyan-500' size='md'>
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
              <li
                key={index}
                className='flex justify-between py-2'
              >
                <p>{character}</p>
                <IconX
                  size={16}
                  onClick={() => removeCharacter(index)}
                  className="cursor-pointer nodrag"
                />
              </li>
            ))}
          </ul>
        )}
      </NodeBody>
    </NodeTemplate>
  );
}