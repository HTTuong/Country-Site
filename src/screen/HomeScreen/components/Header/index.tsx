import SearchInput from './SearchInput'
import * as HiIcons from 'react-icons/hi'

export default function Header() {
    const moveToHome = () => {
        location.reload()
    }

    return (
        <div className='w-full h-20 bg-blue-400 flex items-center justify-between px-8 shadow-sm'>
            <div className='w-fit flex items-center'>
                <HiIcons.HiOutlineMenu className='text-white text-4xl cursor-pointer' />
                <div
                    className='flex items-center justify-center ml-8 cursor-pointer'
                    onClick={moveToHome}
                >
                    <h3 className='text-white text-3xl font-medium '>Country</h3>
                </div>
            </div>
            <div className='w-fit flex items-center'>
                <SearchInput />
            </div>
        </div>
    )
}
