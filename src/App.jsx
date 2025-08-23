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
import SinglePost from './Components/SinglePost/SinglePost';
import Settings from './Components/Settings/Settings';
import { Toaster } from 'react-hot-toast';

const reactQueyClient = new QueryClient();

const appRouter = createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {index:true, element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'profile', element:<ProtectedRoute><Profile/></ProtectedRoute>},
    {path:'settings', element:<ProtectedRoute><Settings/></ProtectedRoute>},
    {path:'login', element:<LogIn/>},
    {path:'signup', element:<SignUp/>},
    {path:'postDetails/:id', element:<ProtectedRoute><SinglePost/></ProtectedRoute>},
    {path:'*', element:<Error/>}
  ]}
])

export default function App() {
  return (
    <UserContextProvider>
      <QueryClientProvider client={reactQueyClient}>
        <Toaster/>
        <RouterProvider router={appRouter}/>
      </QueryClientProvider>
    </UserContextProvider>
  )
}
