import { IconProps } from './type'

const EditorTextunderlineIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 27C4 26.4477 4.44772 26 5 26H27C27.5523 26 28 26.4477 28 27C28 27.5523 27.5523 28 27 28H5C4.44772 28 4 27.5523 4 27Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 6C8.55228 6 9 6.44772 9 7V15C9 16.8565 9.7375 18.637 11.0503 19.9497C12.363 21.2625 14.1435 22 16 22C17.8565 22 19.637 21.2625 20.9497 19.9497C22.2625 18.637 23 16.8565 23 15V7C23 6.44772 23.4477 6 24 6C24.5523 6 25 6.44772 25 7V15C25 17.3869 24.0518 19.6761 22.364 21.364C20.6761 23.0518 18.3869 24 16 24C13.6131 24 11.3239 23.0518 9.63604 21.364C7.94821 19.6761 7 17.3869 7 15V7C7 6.44772 7.44772 6 8 6Z"
                fill={color}
            />
        </svg>
    )
}

export default EditorTextunderlineIcon
