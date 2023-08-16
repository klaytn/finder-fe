import { IconProps } from './type'

const MacoptionIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.882 10L18.3284 22.8929C18.3289 22.8938 18.3293 22.8946 18.3297 22.8955C18.4962 23.2312 18.7542 23.5131 19.074 23.7085C19.3921 23.9029 19.7585 24.0039 20.1312 24H28C28.5523 24 29 23.5523 29 23C29 22.4477 28.5523 22 28 22H20.125L20.1181 22.0001L13.6715 9.10697C13.6711 9.10617 13.6707 9.10536 13.6703 9.10456C13.5057 8.77263 13.2516 8.49329 12.9366 8.2981C12.6213 8.10268 12.2576 7.99942 11.8866 8H11.8875V9L11.8853 8C11.8857 8 11.8861 8 11.8866 8M20.1215 22.0071L20.1215 22.007Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18 9C18 8.44772 18.4477 8 19 8H28C28.5523 8 29 8.44772 29 9C29 9.55228 28.5523 10 28 10H19C18.4477 10 18 9.55228 18 9Z"
                fill={color}
            />
        </svg>
    )
}

export default MacoptionIcon
