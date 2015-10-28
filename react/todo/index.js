import React from 'react';
import { render } from 'react-dom';
import TodoList from './TodoList';

const rootEl = document.createElement('div');
document.body.appendChild(rootEl);

render(<TodoList />, rootEl);
