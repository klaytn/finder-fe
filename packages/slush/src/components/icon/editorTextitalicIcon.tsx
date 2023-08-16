import { IconProps } from './type'

const EditorTextitalicIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.3163 6.0511C19.8402 6.22575 20.1234 6.79207 19.9487 7.31601L13.9487 25.316C13.7741 25.84 13.2077 26.1231 12.6838 25.9485C12.1599 25.7738 11.8767 25.2075 12.0513 24.6836L18.0513 6.68356C18.226 6.15961 18.7923 5.87645 19.3163 6.0511Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 25C7 24.4477 7.44772 24 8 24H18C18.5523 24 19 24.4477 19 25C19 25.5523 18.5523 26 18 26H8C7.44772 26 7 25.5523 7 25Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 7C13 6.44772 13.4477 6 14 6H24C24.5523 6 25 6.44772 25 7C25 7.55228 24.5523 8 24 8H14C13.4477 8 13 7.55228 13 7Z"
                fill={color}
            />
        </svg>
    )
}

export default EditorTextitalicIcon
