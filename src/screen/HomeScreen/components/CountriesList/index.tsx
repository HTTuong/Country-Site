import React from 'react'
import CountryItem from './CountryItem'
import CountryContext from '~root/contexts/CountryContext'
import getAllCountries from '~root/hooks/services/getAllCountries'
import getCountry from '~root/hooks/services/getCountry'
import LoadingSpinner from '~root/components/LoadingSpiner'
import { Pagination } from '@mui/material'
import * as IoIcons from 'react-icons/io'
import classNames from 'classnames'

export default function CountriesList() {
    const [responseCountries, runGetCountries] = getAllCountries()
    const [responseCountry, runGetCountry] = getCountry()
    const [countries, setCountries] = React.useState<any>([])
    const [ascendingSort, setAscendingSort] = React.useState<boolean>()
    const [decendingSort, setDecendingSort] = React.useState<boolean>()
    const ctx = React.useContext(CountryContext)

    // For pagination
    const [currentPage, setCurrentPage] = React.useState<number>(1)
    const [numberOfCountries, setNumberOfCountries] = React.useState<number>()
    const countriesPerPage = 5
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCoutries = countries.slice(indexOfFirstCountry, indexOfLastCountry)

    const fetchContries = React.useCallback(() => {
        runGetCountries({
            callbackAfterSuccess: (data) => {
                if (ascendingSort && !decendingSort) {
                    setCountries(
                        Array.from(data!, (x) => x).sort((a: any, b: any) => {
                            if (a.name.common < b.name.common) {
                                return -1
                            }
                            if (a.name.common > b.name.common) {
                                return 1
                            }
                            return 0
                        }),
                    )
                } else if (!ascendingSort && decendingSort) {
                    setCountries(
                        Array.from(data!, (x) => x).sort((a: any, b: any) => {
                            if (a.name.common > b.name.common) {
                                return -1
                            }
                            if (a.name.common < b.name.common) {
                                return 1
                            }
                            return 0
                        }),
                    )
                } else {
                    setCountries(data)
                }

                setNumberOfCountries(data?.length)
                setCurrentPage(1)
            },
        })
    }, [ascendingSort, decendingSort, runGetCountries])

    const fetchCountry = React.useCallback(() => {
        runGetCountry(
            {
                callbackAfterSuccess: (data) => {
                    setCountries(data)
                    setNumberOfCountries(data?.length)
                    setCurrentPage(1)
                },
            },
            ctx.searchValue,
        )
    }, [runGetCountry, ctx.searchValue])

    React.useLayoutEffect(() => {
        if (ctx.searchValue) {
            fetchCountry()
        } else {
            fetchContries()
        }
    }, [fetchCountry, ctx.searchValue, fetchContries])

    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page)
    }

    const countNumberOfPages = () => {
        if (numberOfCountries) {
            if (numberOfCountries < countriesPerPage) {
                return 1
            } else {
                return Math.ceil(numberOfCountries / countriesPerPage)
            }
        }
    }

    const sortAscending = () => {
        if (ascendingSort === true) {
            setAscendingSort(false)
        } else {
            setAscendingSort(true)
            setDecendingSort(false)
        }
    }

    const sortDecending = () => {
        if (decendingSort === true) {
            setDecendingSort(false)
        } else {
            setAscendingSort(false)
            setDecendingSort(true)
        }
    }

    const handleSortCountries = () => {
        const formatCountries = currentCoutries
        if (ascendingSort && !decendingSort) {
            formatCountries.sort()
        } else if (!ascendingSort && decendingSort) {
            formatCountries.sort()
            formatCountries.reverse()
        } else {
            return formatCountries
        }
        return formatCountries
    }

    return (
        <div className='w-full flex-grow flex flex-col bg-white'>
            <div className='w-full h-16 bg-white grid grid-cols-12 shadow-md'>
                <div className='col-span-3'>
                    <h3 className='leading-[64px] pl-6 font-medium'>Flag</h3>
                </div>
                <div className='col-span-2 flex'>
                    <h3 className='leading-[64px] font-medium w-fit'>Name</h3>
                    <div className='flex flex-col items-center justify-center w-fit ml-2'>
                        <IoIcons.IoMdArrowDropup
                            className={classNames('text-2xl cursor-pointer ', {
                                'text-slate-300': !ascendingSort,
                                'text-black': ascendingSort,
                            })}
                            onClick={sortAscending}
                        />
                        <IoIcons.IoMdArrowDropdown
                            className={classNames('text-2xl cursor-pointer ', {
                                'text-slate-300': !decendingSort,
                                'text-black': decendingSort,
                            })}
                            onClick={sortDecending}
                        />
                    </div>
                </div>
                <div className='col-span-2'>
                    <h3 className='leading-[64px]  font-medium'>Region</h3>
                </div>
                <div className='col-span-2'>
                    <h3 className='leading-[64px]  font-medium'>Population</h3>
                </div>
                <div className='col-span-2'>
                    <h3 className='leading-[64px] font-medium'>Languages</h3>
                </div>
                <div className='col-span-1'></div>
            </div>

            <div className='w-full flex-grow '>
                {!responseCountries.isLoading &&
                    !responseCountry.isLoading &&
                    handleSortCountries().map((country: any) => (
                        <CountryItem key={Math.random()} country={country} />
                    ))}
                {(responseCountries.isLoading || responseCountry.isLoading) && <LoadingSpinner />}
            </div>

            <div className='w-full h-16 bg-white shadow-sm flex items-center justify-center'>
                <Pagination
                    count={countNumberOfPages()}
                    showFirstButton
                    showLastButton
                    page={currentPage}
                    defaultPage={1}
                    onChange={handleChangePage}
                />
            </div>
        </div>
    )
}
