import { useNavigate } from 'react-router-dom'
import * as BsIcons from 'react-icons/bs'
import styled from 'styled-components'

export interface ICountryItem {
    flags: {
        png: string
    }
    name: {
        common: string
    }
    cca2: string
    region: string
    subregion: string
    latlng: number[]
    capital: string
    population: number
    languages: string[]
    independent: boolean
    maps: {
        googleMaps: string
    }
}

interface ICountryItemProps {
    country: ICountryItem
}

const SDiv_Wrapper = styled.div`
    width: 100%;
    height: 20%;
    --tw-bg-opacity: 1;
    // background-color: rgb(241 245 249 / var(--tw-bg-opacity));
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
        var(--tw-shadow);
    border-bottom-width: 1px;
    --tw-border-opacity: 1;
    border-top-color: rgb(212 212 212 / var(--tw-border-opacity));
    border-bottom-color: rgb(212 212 212 / var(--tw-border-opacity));
    transition-property: color, background-color, border-color, outline-color, text-decoration-color,
        fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;

    // &:hover {
    //     --tw-bg-opacity: 1;
    //     background-color: rgb(226 232 240 / var(--tw-bg-opacity));
    // }

    &:last-child {
        border-style: none;
    }
`

export default function CountryItem(props: ICountryItemProps) {
    const navigate = useNavigate()

    const handleToDetailPage = () => {
        navigate(`/name/${props.country.name.common}`, { replace: false })
    }

    return (
        <SDiv_Wrapper className='bg-slate-100 hover:bg-slate-200'>
            <div className='col-span-3 flex items-center pl-6'>
                <img
                    className='block w-1/3 '
                    src={props.country.flags.png}
                    alt={props.country.name.common}
                />
            </div>
            <div className='col-span-2 flex items-center'>
                <h3 className='leading-[64px] font-medium '>{props.country.name.common}</h3>
            </div>
            <div className='col-span-2 flex items-center'>
                <h3 className='leading-[64px]  font-medium'>{props.country.region}</h3>
            </div>
            <div className='col-span-2 flex items-center'>
                <h3 className='leading-[64px] font-medium'>{props.country.population}</h3>
            </div>
            <div className='col-span-2 flex flex-col justify-center'>
                {props.country.languages &&
                    Object.values(props.country.languages)
                        .slice(0, 4)
                        .map((lang: any) => (
                            <h3 key={lang.toString()} className=' leading-7 font-medium '>
                                &bull; {lang}
                            </h3>
                        ))}
            </div>
            <div
                className='col-span-1 flex items-center cursor-pointer justify-center bg-slate-100 hover:bg-blue-300  transition-colors '
                onClick={handleToDetailPage}
            >
                <div>
                    <BsIcons.BsArrowRightCircle className='text-2xl' />
                </div>
            </div>
        </SDiv_Wrapper>
    )
}
