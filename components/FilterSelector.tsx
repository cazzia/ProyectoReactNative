import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { IconSymbol } from './ui/icon-symbol';

interface FilterSelectorProps {
  title: string;
  items: string[];
  selectedItems: string[];
  onSelectionChange: (items: string[]) => void;
  multiSelect?: boolean;
}

export default function FilterSelector({
  title,
  items,
  selectedItems,
  onSelectionChange,
  multiSelect = false
}: FilterSelectorProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleItemPress = (item: string) => {
    if (multiSelect) {
      const isSelected = selectedItems.includes(item);
      if (isSelected) {
        onSelectionChange(selectedItems.filter(i => i !== item));
      } else {
        onSelectionChange([...selectedItems, item]);
      }
    } else {
      if (selectedItems.includes(item)) {
        onSelectionChange([]);
      } else {
        onSelectionChange([item]);
      }
      setIsVisible(false);
    }
  };

  const clearSelection = () => {
    onSelectionChange([]);
    setIsVisible(false);
  };

  const getDisplayText = () => {
    if (selectedItems.length === 0) {
      return `Filtrar por ${title.toLowerCase()}`;
    }
    if (selectedItems.length === 1) {
      return selectedItems[0];
    }
    return `${selectedItems.length} seleccionados`;
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.trigger, selectedItems.length > 0 && styles.triggerActive]}
        onPress={() => setIsVisible(true)}
      >
        <Text style={[styles.triggerText, selectedItems.length > 0 && styles.triggerTextActive]}>
          {getDisplayText()}
        </Text>
        <IconSymbol name="chevron.down" size={14} color={selectedItems.length > 0 ? "#007AFF" : "#666"} />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1} 
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.modal}>
            <View style={styles.header}>
              <Text style={styles.modalTitle}>{title}</Text>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <IconSymbol name="xmark" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            {selectedItems.length > 0 && (
              <TouchableOpacity style={styles.clearButton} onPress={clearSelection}>
                <Text style={styles.clearButtonText}>Limpiar filtros</Text>
              </TouchableOpacity>
            )}

            <ScrollView style={styles.itemsList}>
              {items.map((item) => {
                const isSelected = selectedItems.includes(item);
                return (
                  <TouchableOpacity
                    key={item}
                    style={[styles.item, isSelected && styles.itemSelected]}
                    onPress={() => handleItemPress(item)}
                  >
                    <Text style={[styles.itemText, isSelected && styles.itemTextSelected]}>
                      {item}
                    </Text>
                    {isSelected && (
                      <IconSymbol name="checkmark" size={16} color="#007AFF" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    minWidth: 120,
  },
  triggerActive: {
    backgroundColor: '#f0f7ff',
    borderColor: '#007AFF',
  },
  triggerText: {
    fontSize: 14,
    color: '#666',
  },
  triggerTextActive: {
    color: '#007AFF',
    fontWeight: '500',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxHeight: '60%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  clearButton: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  clearButtonText: {
    color: '#ff3b30',
    fontSize: 14,
    fontWeight: '500',
  },
  itemsList: {
    maxHeight: 300,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemSelected: {
    backgroundColor: '#f0f7ff',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  itemTextSelected: {
    color: '#007AFF',
    fontWeight: '500',
  },
});