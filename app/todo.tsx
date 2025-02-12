import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './index';

const LoginScreen = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, input]);
    setInput('');
  };

  const deleteTodo = (index: number) => {
    const filteredTodos = todos.filter((_, i) => Number(i) !== index);
    setTodos(filteredTodos);
  };

  return (
    <View style={styles.container}>
      <Text>Todo Application</Text>
      <View style={style.todoContainer}>
        <TextInput
          placeholder="Title"
          style={style.input}
          defaultValue={input}
          onChangeText={(value) => setInput(value)}
        />
        <TouchableOpacity style={style.button} onPress={addTodo}>
          <Text style={style.buttonText}>Add Todo</Text>
        </TouchableOpacity>
      </View>
      <View style={style.todoList}>
        {todos.map((todo, index) => (
          <View key={index} style={style.todoItem}>
            <Text style={style.todoText}>{todo}</Text>
            <TouchableOpacity
              onPress={() => deleteTodo(index)}
              style={style.deleteButton}
            >
              <Text style={style.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default LoginScreen;

const style = StyleSheet.create({
  todoContainer: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
    borderRadius: 5,
  },
  input: {
    width: '100%',
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
  },
  todoList: {
    marginTop: 20,
    width: '100%',
  },
  todoItem: {
    flexDirection: 'row', // Arrange items in a row
    justifyContent: 'space-between', // Space between text and button
    alignItems: 'center', // Align items vertically
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 2, // Adds shadow on Android
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 3,
  },
  todoText: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 5,
    borderRadius: 5,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
