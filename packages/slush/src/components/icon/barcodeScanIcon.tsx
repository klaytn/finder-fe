import { IconProps, IconSvg } from './type'

const BarcodeScanIcon = ({ size, color = '#19171C', useOuterColor = false }: IconProps) => {
    return (
        <IconSvg
            useOuterColor={useOuterColor}
            fill={color}
            width={size}
            height={size}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 6C21 5.44772 21.4477 5 22 5H26C26.5523 5 27 5.44772 27 6V10C27 10.5523 26.5523 11 26 11C25.4477 11 25 10.5523 25 10V7H22C21.4477 7 21 6.55228 21 6ZM6 21C6.55228 21 7 21.4477 7 22V25H10C10.5523 25 11 25.4477 11 26C11 26.5523 10.5523 27 10 27H6C5.44772 27 5 26.5523 5 26V22C5 21.4477 5.44772 21 6 21ZM27 22C27 21.4477 26.5523 21 26 21C25.4477 21 25 21.4477 25 22V25H22C21.4477 25 21 25.4477 21 26C21 26.5523 21.4477 27 22 27H26C26.5523 27 27 26.5523 27 26V22ZM5 16C5 15.4477 5.44772 15 6 15H26C26.5523 15 27 15.4477 27 16C27 16.5523 26.5523 17 26 17H6C5.44772 17 5 16.5523 5 16ZM10 7C10.5523 7 11 6.55228 11 6C11 5.44772 10.5523 5 10 5H6C5.44772 5 5 5.44772 5 6V10C5 10.5523 5.44772 11 6 11C6.55228 11 7 10.5523 7 10L7 7L10 7Z"
            />
        </IconSvg>
    )
}

export default BarcodeScanIcon
