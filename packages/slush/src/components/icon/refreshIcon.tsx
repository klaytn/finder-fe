import { IconProps, IconSvg } from './type'

const RefreshIcon = ({ size, color, useOuterColor }: IconProps) => {
    return (
        <IconSvg
            width={size}
            height={size}
            viewBox="0 0 14 14"
            useOuterColor={useOuterColor}
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10.2965 3.70409C9.45068 2.85825 8.28984 2.33325 7.00068 2.33325C4.42234 2.33325 2.33984 4.42158 2.33984 6.99992C2.33984 9.57825 4.42234 11.6666 7.00068 11.6666C9.17651 11.6666 10.9907 10.1791 11.5098 8.16658H10.2965C9.81818 9.52575 8.52318 10.4999 7.00068 10.4999C5.06984 10.4999 3.50068 8.93075 3.50068 6.99992C3.50068 5.06908 5.06984 3.49992 7.00068 3.49992C7.96901 3.49992 8.83234 3.90242 9.46234 4.53825L7.58401 6.41658H11.6673V2.33325L10.2965 3.70409Z" />
        </IconSvg>
    )
}

export default RefreshIcon
