// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import { render } from '../../test/test-utils';
import {screen} from '@testing-library/react'
import EasyButton from '../../components/easy-button'

test('renders with the light styles for the light theme', () => {
  // 🐨 uncomment all of this code and your test will be busted on the next line:
  render(<EasyButton>easy</EasyButton>);
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
  //
  // 🐨 update the `render` call above to use the wrapper option using the
  // ThemeProvider
})

test('dark mode', () => {
  // 🐨 uncomment all of this code and your test will be busted on the next line:
  render(<EasyButton>easy</EasyButton>, { theme: 'dark' });
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
  //
  // 🐨 update the `render` call above to use the wrapper option using the
  // ThemeProvider
})

/* eslint no-unused-vars:0 */
