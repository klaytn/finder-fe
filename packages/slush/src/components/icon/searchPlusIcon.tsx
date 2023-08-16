import { IconProps } from './type'

const SearchPlusIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.5 14.5C9.5 13.9477 9.94772 13.5 10.5 13.5H18.5C19.0523 13.5 19.5 13.9477 19.5 14.5C19.5 15.0523 19.0523 15.5 18.5 15.5H10.5C9.94772 15.5 9.5 15.0523 9.5 14.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.5 9.5C15.0523 9.5 15.5 9.94772 15.5 10.5V18.5C15.5 19.0523 15.0523 19.5 14.5 19.5C13.9477 19.5 13.5 19.0523 13.5 18.5V10.5C13.5 9.94772 13.9477 9.5 14.5 9.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.5 5C9.25329 5 5 9.25329 5 14.5C5 19.7467 9.25329 24 14.5 24C19.7467 24 24 19.7467 24 14.5C24 9.25329 19.7467 5 14.5 5ZM3 14.5C3 8.14873 8.14873 3 14.5 3C20.8513 3 26 8.14873 26 14.5C26 20.8513 20.8513 26 14.5 26C8.14873 26 3 20.8513 3 14.5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.2179 21.2177C21.6085 20.8272 22.2416 20.8272 22.6322 21.2177L28.7072 27.2927C29.0977 27.6832 29.0977 28.3164 28.7072 28.7069C28.3166 29.0974 27.6835 29.0974 27.2929 28.7069L21.2179 22.6319C20.8274 22.2414 20.8274 21.6082 21.2179 21.2177Z"
                fill={color}
            />
        </svg>
    )
}

export default SearchPlusIcon
