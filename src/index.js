import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import axios from "axios";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";

// reducers
const gifList = (state = [], action) => {
    switch (action.type) {
      case "FETCH_GIFS":
        return action.payload;
      default:
        return state;
    }
  };


// sagas
function* fetchGifs() {
    try {
      const gifsResponse = yield axios.get("/gifs");
      yield put({ type: "FETCH_GIFS", payload: gifsResponse.data});
    } catch (error) {
      console.log("error fetching gifs", error);
    }
  }

function* rootSaga() {
  yield takeEvery("FETCH_GIFS", fetchGifs);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ gifList }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
