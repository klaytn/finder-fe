import { IconProps } from './type'

const ChevrondoubleBottomIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 15.2929C5.68342 14.9024 6.31658 14.9024 6.70711 15.2929L16 24.5858L25.2929 15.2929C25.6834 14.9024 26.3166 14.9024 26.7071 15.2929C27.0976 15.6834 27.0976 16.3166 26.7071 16.7071L16.7071 26.7071C16.3166 27.0976 15.6834 27.0976 15.2929 26.7071L5.29289 16.7071C4.90237 16.3166 4.90237 15.6834 5.29289 15.2929Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L16 14.5858L25.2929 5.29289C25.6834 4.90237 26.3166 4.90237 26.7071 5.29289C27.0976 5.68342 27.0976 6.31658 26.7071 6.70711L16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                fill={color}
            />
        </svg>
    )
}

export default ChevrondoubleBottomIcon
