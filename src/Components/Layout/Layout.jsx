import React from 'react'
import style from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import Nav from './../Nav/Nav';

export default function Layout() {
  return (
    <>
      <Nav/>
      <Outlet/>
    </>
  )
}
