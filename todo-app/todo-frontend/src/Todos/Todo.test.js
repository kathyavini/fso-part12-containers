import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { Todo } from './Todo';

describe('Todo component', () => {
  const mockDelete = jest.fn();
  const mockComplete = jest.fn();

  it('Shows the correct text', () => {
    const mockTodo = {
      text: 'Mocked todo text',
      done: false,
    };

    render(
      <Todo
        todo={mockTodo}
        onClickComplete={mockComplete}
        onClickDelete={mockDelete}
      />
    );

    expect(screen.getByText(/mocked todo text/i)).toBeInTheDocument();
  });

  it('Shows text indicating todo is not done when todo is not done', () => {
    const mockTodo = {
      text: 'Mocked todo not done',
      done: false,
    };

    render(
      <Todo
        todo={mockTodo}
        onClickComplete={mockComplete}
        onClickDelete={mockDelete}
      />
    );

    expect(screen.getByText(/this todo is not done/i)).toBeInTheDocument();
  });

  it('Shows Set as done button when todo is not done', () => {
    const mockTodo = {
      text: 'Mocked todo not done',
      done: false,
    };

    render(
      <Todo
        todo={mockTodo}
        onClickComplete={mockComplete}
        onClickDelete={mockDelete}
      />
    );

    const doneButton = screen.getByRole('button', { name: 'Set as done' });

    expect(doneButton).toBeInTheDocument();
  });

  it('Does not show Set as done button when todo is not done', () => {
    const mockTodo = {
      text: 'Mocked todo is done',
      done: true,
    };

    render(
      <Todo
        todo={mockTodo}
        onClickComplete={mockComplete}
        onClickDelete={mockDelete}
      />
    );

    const doneButton = screen.queryByRole('button', { name: 'Set as done' });

    expect(doneButton).toBeNull();
  });

  it('Shows delete button for completed todos', () => {
    const mockDone = {
      text: 'Mocked todo done',
      done: true,
    };

    const mockNotDone = {
      text: 'Mocked todo not done',
      done: true,
    };

    render(
      <Todo
        todo={mockDone}
        onClickComplete={mockComplete}
        onClickDelete={mockDelete}
      />
    );

    const deleteButton = screen.getByRole('button', { name: 'Delete' });

    expect(deleteButton).toBeInTheDocument();
  });

  it('Shows delete button for incomplete todos', () => {
    const mockNotDone = {
      text: 'Mocked todo not done',
      done: false,
    };

    render(
      <Todo
        todo={mockNotDone}
        onClickComplete={mockComplete}
        onClickDelete={mockDelete}
      />
    );

    const deleteButton = screen.getByRole('button', { name: 'Delete' });

    expect(deleteButton).toBeInTheDocument();
  });

  it('Calls the correct passed in function on delete', () => {
    const mockTodo = {
      text: "Doesn't matter",
      done: false,
    };

    render(
      <Todo
        todo={mockTodo}
        onClickComplete={mockComplete}
        onClickDelete={mockDelete}
      />
    );

    const deleteButton = screen.getByRole('button', { name: 'Delete' });

    userEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalled();
    expect(mockComplete).not.toHaveBeenCalled();
  });

  it('Calls the correct passed in function on complete', () => {
    const mockTodo = {
      text: "Doesn't matter",
      done: false,
    };

    render(
      <Todo
        todo={mockTodo}
        onClickComplete={mockComplete}
        onClickDelete={mockDelete}
      />
    );

    const doneButton = screen.getByRole('button', { name: 'Set as done' });

    userEvent.click(doneButton);

    expect(mockDelete).not.toHaveBeenCalled();
    expect(mockComplete).toHaveBeenCalled();
  });
});
