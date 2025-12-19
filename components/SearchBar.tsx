import React, { useCallback, useRef } from 'react';
import { Searchbar } from 'react-native-paper';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  testID?: string;
}

export default function SearchBar({ 
  value, 
  onChangeText, 
  placeholder = "Buscar países...",
  testID = 'search-bar'
}: SearchBarProps) {
  
  return (
    <Searchbar
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      style={{ marginBottom: 16 }}
      testID={testID}
    />
  );
}