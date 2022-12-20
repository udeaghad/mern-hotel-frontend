import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import store from '../redux/ConfigureStore';
import NavBar from '../components/NavBar';

describe('To test the Nav Bar component', () => {
  test('To test Home page renders successfully!', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={store}>
            <NavBar />
          </Provider>
        </BrowserRouter>,
      )
      .toJSON;
    expect(tree).toMatchSnapshot();
  });

  test('Should display the navbar text text', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <NavBar />
        </Provider>
      </BrowserRouter>,
    );
    const text = getByTestId('nav-bar');
    expect(text.textContent).toContain('Home');
    expect(text.textContent).toContain('Reservation');
    expect(text.textContent).toContain('Add Hotel');
    expect(text.textContent).toContain('Add Room');
    expect(text.textContent).toContain('Sign Up');
    expect(text.textContent).toContain('Sign In');
    expect(text.textContent).toContain('BOOooKa.com');
  });
});
