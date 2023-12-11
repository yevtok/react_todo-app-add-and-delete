import React, { useRef, useEffect } from 'react';
import cn from 'classnames';
import { Error } from '../../types/Error';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  onAddTodo: (title: string) => void,
  setError: (error: Error) => void,
  isLoading: boolean,
  todoTitle: string,
  setTodoTitle: (title: string) => void,
};

export const TodoHeader: React.FC<Props> = ({
  onAddTodo,
  setError,
  isLoading,
  todos,
  todoTitle,
  setTodoTitle,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!todoTitle || todoTitle.trim().length === 0) {
      setError(Error.EmptyTitle);

      return;
    }

    onAddTodo(todoTitle.trim());
  };

  useEffect(() => {
    if (inputRef.current && !inputRef.current.disabled) {
      inputRef.current.focus();
    }
  }, [todos.length]);

  return (
    <header className="todoapp__header">
      <button
        aria-label="none"
        type="button"
        className={cn('todoapp__toggle-all',
          { active: todos.every(todo => todo.completed) })}
        data-cy="ToggleAllButton"
      />
      <form
        onSubmit={handleSubmit}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={(event) => setTodoTitle(event.target.value)}
          disabled={isLoading}
          ref={inputRef}
        />
      </form>
    </header>
  );
};