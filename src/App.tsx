import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import './App.css'
import IndexRouter from './routes/inicial';
import { PersistGate } from 'redux-persist/integration/react';
import GlobalStyles from './styles/global';
import 'react-toastify/dist/ReactToastify.css';
// import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        {/* <BrowserRouter> */}
          <GlobalStyles />
          <IndexRouter />
        {/* </BrowserRouter> */}
      </PersistGate>
    </Provider>
  )
}

export default App;