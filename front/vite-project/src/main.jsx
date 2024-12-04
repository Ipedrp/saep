import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Users from './router/users/Users.jsx';
import Task from './router/task/Task.jsx';
import Gerenciamento from './router/gerenciamento/Gerenciamento.jsx';
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Users/>
      },
      {
        path: '/task',
        element: <Task/>
      },
      {
        path: '/gerenciamento',
        element: <Gerenciamento/>
      }
    ]
  }
]) 

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router}/>
  </StrictMode>,
)
