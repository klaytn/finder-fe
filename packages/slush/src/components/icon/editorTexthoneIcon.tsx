import { IconProps } from './type'

const EditorTexthoneIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 6C5.55228 6 6 6.44772 6 7V22C6 22.5523 5.55228 23 5 23C4.44772 23 4 22.5523 4 22V7C4 6.44772 4.44772 6 5 6Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 14.5C4 13.9477 4.44772 13.5 5 13.5H18C18.5523 13.5 19 13.9477 19 14.5C19 15.0523 18.5523 15.5 18 15.5H5C4.44772 15.5 4 15.0523 4 14.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 6C18.5523 6 19 6.44772 19 7V22C19 22.5523 18.5523 23 18 23C17.4477 23 17 22.5523 17 22V7C17 6.44772 17.4477 6 18 6Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27.9718 12.6183C28.297 12.7923 28.5 13.1312 28.5 13.5V25C28.5 25.5523 28.0523 26 27.5 26C26.9477 26 26.5 25.5523 26.5 25V15.3685L25.0547 16.3321C24.5952 16.6384 23.9743 16.5142 23.6679 16.0547C23.3616 15.5952 23.4858 14.9743 23.9453 14.668L26.9453 12.668C27.2521 12.4634 27.6467 12.4443 27.9718 12.6183Z"
                fill={color}
            />
        </svg>
    )
}

export default EditorTexthoneIcon
