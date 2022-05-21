import { createRoot } from 'react-dom/client';
import App from './components/App'
import { Provider } from 'react-redux';
import { store } from './state';

const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

