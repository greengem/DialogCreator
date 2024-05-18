import { create } from 'zustand';

interface CharacterState {
  characters: string[];
  addCharacter: (character: string) => void;
  removeCharacter: (index: number) => void;
}

const useCharacterStore = create<CharacterState>((set) => ({
  characters: ['Player', 'John Doe', 'Jane Smith', 'Alice Johnson'],
  addCharacter: (character: string) =>
    set((state) => ({
      characters: [...state.characters, character],
    })),
  removeCharacter: (index: number) =>
    set((state) => ({
      characters: state.characters.filter((_, i) => i !== index),
    })),
}));

export default useCharacterStore;
