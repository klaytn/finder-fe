import { IconProps } from './type'

const SigninIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.0429 10.0429C11.4334 9.65237 12.0666 9.65237 12.4571 10.0429L17.7071 15.2929C18.0976 15.6834 18.0976 16.3166 17.7071 16.7071L12.4571 21.9571C12.0666 22.3476 11.4334 22.3476 11.0429 21.9571C10.6524 21.5666 10.6524 20.9334 11.0429 20.5429L15.5858 16L11.0429 11.4571C10.6524 11.0666 10.6524 10.4334 11.0429 10.0429Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 16C2 15.4477 2.44772 15 3 15H17C17.5523 15 18 15.4477 18 16C18 16.5523 17.5523 17 17 17H3C2.44772 17 2 16.5523 2 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 5C16 4.44772 16.4477 4 17 4H24C24.5304 4 25.0391 4.21071 25.4142 4.58579C25.7893 4.96086 26 5.46957 26 6V26C26 26.5304 25.7893 27.0391 25.4142 27.4142C25.0391 27.7893 24.5304 28 24 28H17C16.4477 28 16 27.5523 16 27C16 26.4477 16.4477 26 17 26H24L24 6L17 6C16.4477 6 16 5.55228 16 5Z"
                fill={color}
            />
        </svg>
    )
}

export default SigninIcon
