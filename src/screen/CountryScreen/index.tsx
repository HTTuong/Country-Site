import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import getCountry from '~root/hooks/services/getCountry'
import LoadingSpinner from '~root/components/LoadingSpiner'
import { ICountryItem } from '../HomeScreen/components/CountriesList/CountryItem'
import * as BsIcons from 'react-icons/bs'

import * as MdIcons from 'react-icons/md'

import classNames from 'classnames'

export default function CountryScreen() {
    const { countryName } = useParams()
    const [responseCountry, runGetCountry] = getCountry()
    const [country, setCountry] = React.useState(undefined as unknown as ICountryItem)
    const navigate = useNavigate()

    const fetchCountry = React.useCallback(() => {
        runGetCountry(
            {
                callbackAfterSuccess: (data: any) => {
                    if (data) {
                        setCountry(data[0])
                    }
                },
            },
            countryName,
        )
    }, [countryName, runGetCountry])

    React.useLayoutEffect(() => {
        fetchCountry()
    }, [fetchCountry])

    const handleBackToHome = () => {
        navigate('/', { replace: false })
    }

    return (
        <div className='w-full h-screen flex items-center justify-center shadow-md'>
            {!responseCountry.isLoading && (
                <div className='w-full h-fit  bg-white/80 p-8 max-w-5xl'>
                    <div className='w-full h-full '>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center justify-center '>
                                <div
                                    className={classNames(
                                        `flex items-center justify-center w-16 h-16 bg-slate-200 p-4 rounded-full`,
                                    )}
                                >
                                    <h3 className='text-2xl'>{country?.cca2}</h3>
                                </div>
                                <div className='flex flex-col items-start ml-6'>
                                    <h3 className='text-3xl'>
                                        {country?.name.common.toUpperCase()}
                                    </h3>
                                    <p className='text-xl'>{country?.capital}</p>
                                </div>
                            </div>
                            <div className='flex items-center justify-between'>
                                <BsIcons.BsThreeDotsVertical className='text-2xl' />
                            </div>
                        </div>

                        <div className='w-full flex justify-center py-12'>
                            <img
                                className='block w-1/2 shadow-sm'
                                src={country?.flags.png}
                                alt={country?.name.common}
                            />
                        </div>

                        <div className='text-black text-lg'>
                            The country belongs to{' '}
                            <p className='text-blue-500 inline'>{country?.region}</p> region and{' '}
                            <p className='text-blue-500 inline'>{country?.subregion}</p> sub-region.
                            Located at the{' '}
                            <p className='text-blue-500 inline'>{country?.latlng[0].toFixed(0)}</p>{' '}
                            °N and{' '}
                            <p className='text-blue-500 inline'>{country?.latlng[1].toFixed(0)}</p>{' '}
                            °W, this country has population of{' '}
                            <p className='text-blue-500 inline'>{country?.population}</p> and it{' '}
                            {country?.independent ? 'has' : 'has not'} gained the independent,
                            according to the CIA World Factbook.
                        </div>

                        <div className='flex items-center justify-start mt-8'>
                            <div
                                className='flex items-center justify-start p-2 text-black hover:text-blue-600 transition-colors cursor-pointer'
                                onClick={handleBackToHome}
                            >
                                <MdIcons.MdOutlineArrowBackIosNew className='text-3xl ' />
                            </div>
                            <a
                                className=' flex items-center justify-start ml-8 p-2 text-black hover:text-blue-600 transition-colors cursor-pointer no-underline'
                                href={country?.maps.googleMaps}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <MdIcons.MdLocationOn className='text-3xl' />
                            </a>
                        </div>
                    </div>
                </div>
            )}
            {responseCountry.isLoading && (
                <div className='w-full h-screen'>
                    <LoadingSpinner />
                </div>
            )}
        </div>
    )
}
