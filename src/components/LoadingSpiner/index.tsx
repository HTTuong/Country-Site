import * as CgIcons from 'react-icons/cg'

export default function LoadingSpinner() {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <CgIcons.CgSpinner className='animate-spin text-9xl  text-black' />
        </div>
    )
}
