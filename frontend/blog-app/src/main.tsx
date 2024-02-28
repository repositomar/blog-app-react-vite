import React from 'react'
import ReactDOM from 'react-dom/client'
import BlogApp from './BlogApp.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BlogApp />
    </Provider>
  </React.StrictMode>,
)
