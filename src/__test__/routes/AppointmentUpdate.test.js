import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppointmentUpdate from '../../routes/AppointmentUpdate';
import { store } from '../../redux/store';

test('AppointmentUpdate component renders correctly', () => {
  const queryClient = new QueryClient();
  const component = renderer.create(
    <Router>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AppointmentUpdate />
        </Provider>
      </QueryClientProvider>
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
