import React, { Component, useState } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';


const App = () => {

  let id = 2 // 초기 id 값

  const [state , setState] = useState({

    input: '',
    todos: [
      { id: 0, text: ' 자바스크립트', checked: true },
      { id: 1, text: ' 리액트', checked: false }
     
    ]

  });



 const handleChange = (e) => {
    setState({
      input: e.target.value 
    });
  }

  const handleCreate = () => {
    const { input, todos } = state;
    setState({
      input: '', // 인풋 비우고
      // concat 을 사용하여 배열에 추가
      todos: todos.concat({
        id: id++,
        text: input,
        checked: false
      })
    });
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      handleCreate();
    }
  }

  const handleToggle = (id) => {
    const { todos } = state;

    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; 

    const nextTodos = [...todos]; 

    nextTodos[index] = { 
      ...selected, 
      checked: !selected.checked
    };

    setState({
      todos: nextTodos
    });
  }

  const handleRemove = (id) => {
    const { todos } = state;
    setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

   
    const { input, todos } = state;
  

    return (
      <TodoListTemplate form={(
        <Form 
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />
      )}>
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
      </TodoListTemplate>
    );
  
}

export default App;