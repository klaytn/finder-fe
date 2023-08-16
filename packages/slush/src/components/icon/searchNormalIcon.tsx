import { IconProps, IconSvg } from './type'

const SearchNormalIcon = ({ size, color = '#19171C', useOuterColor }: IconProps) => {
    return (
        <IconSvg
            width={size}
            height={size}
            useOuterColor={useOuterColor}
            viewBox="0 0 32 32"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.5 5C9.25329 5 5 9.25329 5 14.5C5 19.7467 9.25329 24 14.5 24C19.7467 24 24 19.7467 24 14.5C24 9.25329 19.7467 5 14.5 5ZM3 14.5C3 8.14873 8.14873 3 14.5 3C20.8513 3 26 8.14873 26 14.5C26 20.8513 20.8513 26 14.5 26C8.14873 26 3 20.8513 3 14.5Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.2179 21.2177C21.6085 20.8272 22.2416 20.8272 22.6322 21.2177L28.7072 27.2927C29.0977 27.6832 29.0977 28.3164 28.7072 28.7069C28.3166 29.0974 27.6835 29.0974 27.2929 28.7069L21.2179 22.6319C20.8274 22.2414 20.8274 21.6082 21.2179 21.2177Z"
            />
        </IconSvg>
    )
}

export default SearchNormalIcon
