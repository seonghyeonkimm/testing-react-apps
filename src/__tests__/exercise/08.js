// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import { renderHook, act as hAct } from '@testing-library/react-hooks';

// 🐨 create a simple function component that uses the useCounter hook
function TestComponent() {
  const { count, increment, decrement } = useCounter();
  return (
    <div>
      <span data-testid="count">current: {count}</span>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  );
}

// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()

test('exposes the count and increment/decrement functions', () => {
  render(<TestComponent />)

  // 🐨 render the component
  // 🐨 get the elements you need using screen
  // 🐨 assert on the initial state of the hook
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  const increment = screen.getByRole('button', { name: /increment/i });
  const decrement = screen.getByRole('button', { name: /decrement/i });

  expect(screen.getByTestId('count')).toHaveTextContent('current: 0');
  userEvent.click(increment);
  expect(screen.getByTestId('count')).toHaveTextContent('current: 1');
  userEvent.click(decrement);
  expect(screen.getByTestId('count')).toHaveTextContent('current: 0');
})

test('fake component', () => {
  let result;
  function FakeComponent(props) {
    result = useCounter();
    return null;
  }
  render(<FakeComponent />)

  expect(result.count).toBe(0);
  act(() => result.increment())
  expect(result.count).toBe(1);
  act(() => result.decrement());
  expect(result.count).toBe(0);
})

test('setup function', () => {
  const results = {}
  function TestComponent(props) {
    Object.assign(results, useCounter(props))
    return null
  }

  render(<TestComponent initialCount={2} step={2} />)
  expect(results.count).toBe(2);
  act(() => results.increment());
  expect(results.count).toBe(4);
  act(() => results.decrement());
  expect(results.count).toBe(2);
});

test('reac-hooks testing library', () => {
  const { result } = renderHook(() => useCounter());
  expect(result.current.count).toBe(0);
  hAct(() => result.current.increment());
  expect(result.current.count).toBe(1);
  hAct(() => result.current.decrement());
  expect(result.current.count).toBe(0);
})

/* eslint no-unused-vars:0 */
