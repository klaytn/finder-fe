import { IconProps } from './type'

const TrashcanNormalIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 7C4 6.44772 4.44772 6 5 6H27C27.5523 6 28 6.44772 28 7C28 7.55228 27.5523 8 27 8H5C4.44772 8 4 7.55228 4 7Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 12C13.5523 12 14 12.4477 14 13V21C14 21.5523 13.5523 22 13 22C12.4477 22 12 21.5523 12 21V13C12 12.4477 12.4477 12 13 12Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 12C19.5523 12 20 12.4477 20 13V21C20 21.5523 19.5523 22 19 22C18.4477 22 18 21.5523 18 21V13C18 12.4477 18.4477 12 19 12Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 6C7.55228 6 8 6.44772 8 7V26H24V7C24 6.44772 24.4477 6 25 6C25.5523 6 26 6.44772 26 7V26C26 26.5304 25.7893 27.0391 25.4142 27.4142C25.0391 27.7893 24.5304 28 24 28H8C7.46957 28 6.96086 27.7893 6.58579 27.4142C6.21071 27.0391 6 26.5304 6 26V7C6 6.44772 6.44772 6 7 6Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.8787 2.87868C11.4413 2.31607 12.2044 2 13 2H19C19.7956 2 20.5587 2.31607 21.1213 2.87868C21.6839 3.44129 22 4.20435 22 5V7C22 7.55228 21.5523 8 21 8C20.4477 8 20 7.55228 20 7V5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4H13C12.7348 4 12.4804 4.10536 12.2929 4.29289C12.1054 4.48043 12 4.73478 12 5V7C12 7.55228 11.5523 8 11 8C10.4477 8 10 7.55228 10 7V5C10 4.20435 10.3161 3.44129 10.8787 2.87868Z"
                fill={color}
            />
        </svg>
    )
}

export default TrashcanNormalIcon
