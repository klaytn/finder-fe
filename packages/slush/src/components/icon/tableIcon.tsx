import { IconProps } from './type'

const TableIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 7C3 6.44772 3.44772 6 4 6H28C28.5523 6 29 6.44772 29 7V24C29 24.5304 28.7893 25.0391 28.4142 25.4142C28.0391 25.7893 27.5304 26 27 26H5C4.46957 26 3.96086 25.7893 3.58579 25.4142C3.21071 25.0391 3 24.5304 3 24V7ZM5 8V24H27V8H5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 13C3 12.4477 3.44772 12 4 12H28C28.5523 12 29 12.4477 29 13C29 13.5523 28.5523 14 28 14H4C3.44772 14 3 13.5523 3 13Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 19C3 18.4477 3.44772 18 4 18H28C28.5523 18 29 18.4477 29 19C29 19.5523 28.5523 20 28 20H4C3.44772 20 3 19.5523 3 19Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 12C11.5523 12 12 12.4477 12 13V25C12 25.5523 11.5523 26 11 26C10.4477 26 10 25.5523 10 25V13C10 12.4477 10.4477 12 11 12Z"
                fill={color}
            />
        </svg>
    )
}

export default TableIcon
