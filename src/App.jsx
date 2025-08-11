import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import SignUp from './Components/SignUp/SignUp';
import LogIn from './Components/LogIn/LogIn';
import Error from './Components/Error/Error';
import UserContextProvider from './Contexts/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const reactQueyClient = new QueryClient();

const appRouter = createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {index:true, element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'profile', element:<ProtectedRoute><Profile/></ProtectedRoute>},
    {path:'login', element:<LogIn/>},
    {path:'signup', element:<SignUp/>},
    {path:'*', element:<Error/>}
  ]}
])

export default function App() {
  return (
    <UserContextProvider>
      <QueryClientProvider client={reactQueyClient}>
        <RouterProvider router={appRouter}/>
      </QueryClientProvider>
    </UserContextProvider>
  )
}
