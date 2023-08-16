import { IconProps } from './type'

const ChartlineNormalIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5C4.55228 5 5 5.44772 5 6V25H28C28.5523 25 29 25.4477 29 26C29 26.5523 28.5523 27 28 27H4C3.44772 27 3 26.5523 3 26V6C3 5.44772 3.44772 5 4 5Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.7526 11.3415C29.1163 11.7571 29.0742 12.3889 28.6585 12.7526L20.6585 19.7526C20.3029 20.0637 19.778 20.0835 19.4 19.8L12.0485 14.2864L4.65852 20.7526C4.24288 21.1163 3.61112 21.0742 3.24744 20.6585C2.88375 20.2429 2.92587 19.6111 3.34151 19.2474L11.3415 12.2474C11.6971 11.9363 12.222 11.9165 12.6 12.2L19.9515 17.7137L27.3415 11.2474C27.7571 10.8838 28.3889 10.9259 28.7526 11.3415Z"
                fill={color}
            />
        </svg>
    )
}

export default ChartlineNormalIcon
