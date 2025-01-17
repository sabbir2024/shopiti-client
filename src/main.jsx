import { createRoot } from 'react-dom/client'
import './index.css'
import Route from './route/Route.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './provider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={Route} />
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
  </AuthProvider>
)
