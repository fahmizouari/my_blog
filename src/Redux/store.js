import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import allReducers from "./reducers";

const persistConfig = {
  key: "root",
  timeout: null,
  storage: storage,
};

const persistedReducers = persistReducer(persistConfig, allReducers);
const store = createStore(
  persistedReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
export const persistor = persistStore(store);
