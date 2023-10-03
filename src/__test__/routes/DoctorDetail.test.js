import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import DoctorDetail from '../../routes/DoctorDetail';
import { store } from '../../redux/store';

test('DoctorDetail component renders correctly', () => {
  const component = renderer.create(
    <Router>
      <Provider store={store}>
        <DoctorDetail />
      </Provider>
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
