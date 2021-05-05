import { Provider } from "react-redux";

import Route from "./configs/router/MainRoute";

import store from "./configs/redux/store";

function App() {
  return (
    <Provider store={store}>
      {/* <Provider> */}
      <Route />
    </Provider>
  );
}

export default App;
