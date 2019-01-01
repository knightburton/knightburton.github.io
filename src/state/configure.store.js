import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import history from '../side.effects/history';
import thunk from 'redux-thunk';
//import rootReducer from './root.reducer';

const isDevelopment = process.env.NODE_ENV === 'development';

const middlewares = applyMiddleware(
  thunk.withExtraArgument({
    history
  })
);

export const store = createStore(
  //rootReducer,
  isDevelopment ? composeWithDevTools(middlewares) : middlewares
);
