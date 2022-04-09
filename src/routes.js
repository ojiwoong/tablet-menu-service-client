import React from 'react'

const Menus = React.lazy(() => import('./views/base/menus/Menus'))
const Carts = React.lazy(() => import('./views/base/carts/Carts'))
const Bill = React.lazy(() => import('./views/base/bill/Bill'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/base/menus', name: 'Menus', element: Menus },
  { path: '/base/carts', name: 'Carts', element: Carts },
  { path: '/base/bill', name: 'Bill', element: Bill },
]

export default routes
