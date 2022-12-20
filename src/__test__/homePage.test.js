import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
import store from '../redux/ConfigureStore';
import Homepage from '../components/HomePage';
// import { getAllHotels } from '../redux/hotels/hotelsAction';

// const middlewares = [thunk]; // add your middlewares like `redux-thunk`
// const mockStore = configureStore(middlewares);

describe('To test the home page component', () => {
  test('To test Home page renders successfully!', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={store}>
            <Homepage />
          </Provider>
        </BrowserRouter>,
      )
      .toJSON;
    expect(tree).toMatchSnapshot();
  });

  test('Should display a welcome text', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Homepage />
        </Provider>
      </BrowserRouter>,
    );
    const text = getByTestId('heading-text');

    expect(text.innerHTML).toBe('...you wanna book a hotel');
  });

  test('Should display the carousel', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Homepage />
        </Provider>
      </BrowserRouter>,
    );
    const text = getByTestId('main_card_container');
    expect(text.innerHTML).toContain('carousel');
  });

  // it('should execute fetch data', () => {
  //   const newStore = mockStore([])

  //   return newStore.dispatch( getAllHotels())
  //   .then(() => {
  //     const actions = newStore.getActions()
  //     console.log(actions)
  //     expect(actions[0]).toEqual(success())
  //   })

  // const actions =  newStore.getActions()
  //   console.log(actions)
  //   expect(actions.length).toEqual(2)

  // })
});
