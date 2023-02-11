import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { LOCAL_STORAGE_TOKEN_LOGIN } from '~root/constants'
import { Navigate } from 'react-router-dom'
import DefaultLayout from '~root/layouts/DefaultLayout'
import HomeScreen from './HomeScreen'
import CountryScreen from './CountryScreen'

export interface IRoutes {
    path: string
    requiredLogin: boolean
    element: React.ReactNode
    Layout?: React.FunctionComponent<any> | React.FC<any>
}

const routesList: IRoutes[] = [
    {
        path: '/',
        requiredLogin: false,
        element: <HomeScreen />,
        Layout: DefaultLayout,
    },
    {
        path: '/name/:countryName',
        requiredLogin: false,
        element: <CountryScreen />,
        Layout: DefaultLayout,
    },
]

export const RoutesList = () => {
    return (
        <Routes>
            {routesList.map((route, idx) => {
                let Element = route.element
                if (route.Layout) {
                    Element = <route.Layout>{Element}</route.Layout>
                }
                if (route.requiredLogin) {
                    Element = <RequiredLogin>{Element}</RequiredLogin>
                }
                return <Route key={route.path} path={route.path} element={Element} />
            })}
        </Routes>
    )
}

function RequiredLogin(props: { children?: React.ReactNode }) {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_LOGIN)

    if (token) {
        return <>{props.children}</>
    } else {
        return <Navigate to='/login' replace />
    }
}
