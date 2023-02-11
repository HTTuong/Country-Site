import React from 'react'
import Header from './components/Header'
import CountriesList from './components/CountriesList'

interface IHomeScreenProps {
    children?: React.ReactNode
}

export default function HomeScreen(props: IHomeScreenProps) {
    return (
        <div className='w-full h-screen flex flex-col overflow-hidden'>
            <Header />
            <CountriesList />
        </div>
    )
}
