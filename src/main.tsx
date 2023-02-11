import ReactDOM from 'react-dom/client'
import App from './App'
import AppContextProvider from './contexts'
import { BrowserRouter } from 'react-router-dom'

// Theme
import './index.css'
import './theme/main-colors.css'
import './theme/theme-color-configs.css'
import './theme/theme-background-configs.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <AppContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AppContextProvider>,
)
