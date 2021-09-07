import React, { Fragment } from 'react';
import './App.css';

import Container from '@material-ui/core/Container';

import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';

function App() {
  return (
    <Fragment>
      <Container>
        <InputTodo />
        <ListTodos />
      </Container>
    </Fragment>
  );
}

export default App;
