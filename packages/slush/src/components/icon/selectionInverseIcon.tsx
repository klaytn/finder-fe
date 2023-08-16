import { IconProps } from './type'

const SelectionInverseIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 27C13 26.4477 13.4477 26 14 26H18C18.5523 26 19 26.4477 19 27C19 27.5523 18.5523 28 18 28H14C13.4477 28 13 27.5523 13 27Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 13C5.55228 13 6 13.4477 6 14V18C6 18.5523 5.55228 19 5 19C4.44772 19 4 18.5523 4 18V14C4 13.4477 4.44772 13 5 13Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 22C5.55228 22 6 22.4477 6 23V26H9C9.55228 26 10 26.4477 10 27C10 27.5523 9.55228 28 9 28H6C5.46957 28 4.96086 27.7893 4.58579 27.4142C4.21071 27.0391 4 26.5304 4 26V23C4 22.4477 4.44772 22 5 22Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H26C26.5304 4 27.0391 4.21071 27.4142 4.58579C27.7893 4.96086 28 5.46957 28 6V26C28 26.5304 27.7893 27.0391 27.4142 27.4142C27.0391 27.7893 26.5304 28 26 28H23C22.4477 28 22 27.5523 22 27C22 26.4477 22.4477 26 23 26H26V6L6 6L6 9C6 9.55228 5.55228 10 5 10C4.44772 10 4 9.55228 4 9V6C4 5.46957 4.21071 4.96086 4.58579 4.58579Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.58037 4.58049C4.97089 4.18997 5.60406 4.18997 5.99458 4.58049L27.4196 26.0055C27.8101 26.396 27.8101 27.0292 27.4196 27.4197C27.0291 27.8102 26.3959 27.8102 26.0054 27.4197L4.58037 5.9947C4.18984 5.60418 4.18984 4.97102 4.58037 4.58049Z"
                fill={color}
            />
        </svg>
    )
}

export default SelectionInverseIcon
