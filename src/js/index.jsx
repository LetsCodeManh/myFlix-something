// Import for React
import React from "react";
import ReactDOM from "react-dom";

// Import View
import { MainView } from "./components/MainView/main-view";

// Import Redux Component
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

// Import Reducers for Redux
import moviesApp from "./Redux/reducers";

// Create a new Store for the app
const store = createStore(moviesApp, composeWithDevTools());

class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
