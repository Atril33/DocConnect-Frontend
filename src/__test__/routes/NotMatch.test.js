import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import NotMatch from '../../routes/NotMatch';

test('NotMatch component renders correctly', () => {
  const component = renderer.create(
    <Router>
      <Provider store={store}>
        <NotMatch />
      </Provider>
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
