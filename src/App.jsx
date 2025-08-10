import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import SignUp from './Components/SignUp/SignUp';
import LogIn from './Components/LogIn/LogIn';
import Error from './Components/Error/Error';

const appRouter = createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {index:true, element:<Home/>},
    {path:'home', element:<Home/>},
    {path:'profile', element:<Profile/>},
    {path:'login', element:<LogIn/>},
    {path:'signup', element:<SignUp/>},
    {path:'*', element:<Error/>}
  ]}
])

export default function App() {
  return (
    <RouterProvider router={appRouter}/>
  )
}
