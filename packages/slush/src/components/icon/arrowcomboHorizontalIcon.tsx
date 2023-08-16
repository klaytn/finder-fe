import { IconProps } from './type'

const ArrowcomboHorizontalIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.70711 11.2929C8.09763 11.6834 8.09763 12.3166 7.70711 12.7071L4.41421 16L7.70711 19.2929C8.09763 19.6834 8.09763 20.3166 7.70711 20.7071C7.31658 21.0976 6.68342 21.0976 6.29289 20.7071L2.29289 16.7071C1.90237 16.3166 1.90237 15.6834 2.29289 15.2929L6.29289 11.2929C6.68342 10.9024 7.31658 10.9024 7.70711 11.2929Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24.2929 11.2929C24.6834 10.9024 25.3166 10.9024 25.7071 11.2929L29.7071 15.2929C30.0976 15.6834 30.0976 16.3166 29.7071 16.7071L25.7071 20.7071C25.3166 21.0976 24.6834 21.0976 24.2929 20.7071C23.9024 20.3166 23.9024 19.6834 24.2929 19.2929L27.5858 16L24.2929 12.7071C23.9024 12.3166 23.9024 11.6834 24.2929 11.2929Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 16C2 15.4477 2.44772 15 3 15H29C29.5523 15 30 15.4477 30 16C30 16.5523 29.5523 17 29 17H3C2.44772 17 2 16.5523 2 16Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowcomboHorizontalIcon
