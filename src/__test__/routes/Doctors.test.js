import 'match-media-mock';
import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import Doctors from '../../routes/Doctors';
import { store } from '../../redux/store';

// eslint-disable-next-line react/prop-types,react/display-name
jest.mock('react-slick', () => ({ children }) => <div>{children}</div>);

test('Doctors component renders correctly', () => {
  const queryClient = new QueryClient();
  const component = renderer.create(
    <Router>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Doctors />
        </Provider>
      </QueryClientProvider>
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
