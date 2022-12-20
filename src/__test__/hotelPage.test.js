import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import store from '../redux/ConfigureStore';
import HotelPage from '../components/HotelPage';

describe('To test the hotel page component', () => {
  test('To test Home page renders successfully!', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={store}>
            <HotelPage />
          </Provider>
        </BrowserRouter>,
      )
      .toJSON;
    expect(tree).toMatchSnapshot();
  });
});
