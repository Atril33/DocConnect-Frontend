import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Login from '../../routes/Login';

test('Login component renders correctly', () => {
  const queryClient = new QueryClient();
  const component = renderer.create(
    <Router>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Login />
        </Provider>
      </QueryClientProvider>
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
