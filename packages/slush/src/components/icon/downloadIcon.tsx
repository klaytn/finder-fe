import { IconProps, IconSvg } from './type'

const DownloadIcon = ({ size, color = '#19171C', useOuterColor = false }: IconProps) => {
    return (
        <IconSvg
            width={size}
            height={size}
            useOuterColor={useOuterColor}
            fill={color}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0429 13.0429C10.4334 12.6524 11.0666 12.6524 11.4571 13.0429L16 17.5858L20.5429 13.0429C20.9334 12.6524 21.5666 12.6524 21.9571 13.0429C22.3476 13.4334 22.3476 14.0666 21.9571 14.4571L16.7071 19.7071C16.3166 20.0976 15.6834 20.0976 15.2929 19.7071L10.0429 14.4571C9.65237 14.0666 9.65237 13.4334 10.0429 13.0429Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 4C16.5523 4 17 4.44772 17 5V19C17 19.5523 16.5523 20 16 20C15.4477 20 15 19.5523 15 19V5C15 4.44772 15.4477 4 16 4Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 18C5.55228 18 6 18.4477 6 19V26H26V19C26 18.4477 26.4477 18 27 18C27.5523 18 28 18.4477 28 19V26C28 26.5304 27.7893 27.0391 27.4142 27.4142C27.0391 27.7893 26.5304 28 26 28H6C5.46957 28 4.96086 27.7893 4.58579 27.4142C4.21071 27.0391 4 26.5304 4 26V19C4 18.4477 4.44772 18 5 18Z"
            />
        </IconSvg>
    )
}

export default DownloadIcon
