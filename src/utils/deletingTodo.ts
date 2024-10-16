import { deleteTodo } from '../api/todos';
import { Errors } from './Errors';
import { Todo } from '../types/Todo';
import React from 'react';
import { handleError } from './handleError';

export const deletingTodo = (
  IdsArray: number[],
  setError: React.Dispatch<React.SetStateAction<Errors>>,
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
) => {
  return Promise.allSettled(
    IdsArray.map(async id => {
      try {
        await deleteTodo(id);
        setTodos((prevState: Todo[]) =>
          prevState.filter(todo => todo.id !== id),
        );
      } catch {
        handleError(Errors.DeleteTodo, setError);
      }
    }),
  );
};
