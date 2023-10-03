import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import AddDoc from '../../routes/AddDoc';
import store from '../../redux/store';

test('AddDoc component renders correctly', () => {
  const queryClient = new QueryClient();
  const component = renderer.create(
    <Router>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AddDoc />
        </Provider>
      </QueryClientProvider>
    </Router>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
