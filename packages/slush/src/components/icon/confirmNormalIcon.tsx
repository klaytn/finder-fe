import { IconProps, IconSvg } from './type'

const ConfirmNormalIcon = ({ size, color, useOuterColor }: IconProps) => {
    return (
        <IconSvg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill={color}
            useOuterColor={useOuterColor}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27.7071 8.29289C28.0976 8.68342 28.0976 9.31658 27.7071 9.70711L13.7071 23.7071C13.3166 24.0976 12.6834 24.0976 12.2929 23.7071L5.29289 16.7071C4.90237 16.3166 4.90237 15.6834 5.29289 15.2929C5.68342 14.9024 6.31658 14.9024 6.70711 15.2929L13 21.5858L26.2929 8.29289C26.6834 7.90237 27.3166 7.90237 27.7071 8.29289Z"
            />
        </IconSvg>
    )
}

export default ConfirmNormalIcon
