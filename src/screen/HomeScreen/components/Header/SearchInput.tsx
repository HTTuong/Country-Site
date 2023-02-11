import React from 'react'
import AppContext from '~root/contexts/CountryContext'
import * as TfiIcons from 'react-icons/tfi'

export default function SearchInput() {
    const [enteredValue, setEnteredValue] = React.useState<string>('')
    const ctx = React.useContext(AppContext)

    const handleSaveValue = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && enteredValue) {
            event.preventDefault()
            ctx.setSearchValue(enteredValue)
        } else {
            ctx.setSearchValue('')
        }
    }

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.startsWith(' ')) {
            return
        }
        setEnteredValue(event.target.value)
    }

    return (
        <div className='flex items-center bg-white rounded-md overflow-hidden relative'>
            <div className='flex items-center justify-center pl-4 pr-3 py-3'>
                <TfiIcons.TfiSearch className='text-black text-2xl' />
            </div>

            <input
                id='search-input'
                type='text'
                className='py-2 px-2 text-lg outline-none w-64'
                placeholder='Search by country name'
                onChange={handleChangeInput}
                value={enteredValue}
                onKeyDown={handleSaveValue}
            />
        </div>
    )
}
