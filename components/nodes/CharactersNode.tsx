'use client'
import { NodeTemplate, NodeBody, NodeHeading } from './NodeTemplate';
import { TextField } from '@radix-ui/themes';
import { IconPlus, IconUser, IconX } from '@tabler/icons-react';
import { useState, ChangeEvent } from 'react';
import useCharacterStore from '@/data/useCharacterStore';

export default function CharactersNode() {
  const { characters, addCharacter, removeCharacter } = useCharacterStore();
  const [newCharacter, setNewCharacter] = useState<string>('');

  const handleAddCharacter = () => {
    if (newCharacter.trim() !== '') {
      addCharacter(newCharacter.trim());
      setNewCharacter('');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCharacter(e.target.value);
  };

  return (
    <NodeTemplate color='bg-blue-500'>
      <NodeHeading title='Characters' />
      <NodeBody>
        <div className='flex justify-between'>
          <TextField.Root
            placeholder="Add a character…"
            value={newCharacter}
            onChange={handleChange}
          >
            <TextField.Slot>
              <IconUser height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>

          <button onClick={handleAddCharacter}>
            <IconPlus />
          </button>
        </div>

        <ul>
          {characters.map((character, index) => (
            <li
              key={index}
              className='flex justify-between border-b-2 border-zinc-700 py-2 last:border-0'
            >
              <p>{character}</p>
              <IconX
                size={16}
                onClick={() => removeCharacter(index)}
                className="cursor-pointer"
              />
            </li>
          ))}
        </ul>
      </NodeBody>
    </NodeTemplate>
  );
}
