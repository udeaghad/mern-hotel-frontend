import React from 'react';
import { Provider } from  'react-redux';
import renderer from 'react-test-renderer';
import store from '../redux/ConfigureStore'
import Homepage from '../components/HomePage'
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';


describe("To test the home page component", () =>{
  test('To test Home page renders successfully!', () => {    
    const tree = renderer
      .create(
      <BrowserRouter>
        <Provider store={store}>
        <Homepage />
      </Provider>
      </BrowserRouter>
      )
      .toJSON;
    expect(tree).toMatchSnapshot()
  })

  test('Should display a welcome text', () => {
    const {getByTestId} = render(
      <BrowserRouter>
        <Provider store={store}>
          <Homepage />
        </Provider>
      </BrowserRouter>
      )
    const text = getByTestId('heading-text')
    
    expect(text.innerHTML).toBe("...you wanna book a hotel")
  })

  test('Should display the carousel', () => {
    const {getByTestId} = render(
      <BrowserRouter>
        <Provider store={store}>
          <Homepage />
        </Provider>
      </BrowserRouter>
      )
    const text = getByTestId('main_card_container')    
    expect(text.innerHTML).toContain("carousel")
  })
})
