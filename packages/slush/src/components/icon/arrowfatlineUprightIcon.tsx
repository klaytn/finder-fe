import { IconProps } from './type'

const ArrowfatlineUprightIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24.7071 6.29289C25.0976 6.68342 25.0976 7.31658 24.7071 7.70711L10.7071 21.7071C10.3166 22.0976 9.68342 22.0976 9.29289 21.7071C8.90237 21.3166 8.90237 20.6834 9.29289 20.2929L23.2929 6.29289C23.6834 5.90237 24.3166 5.90237 24.7071 6.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.5 7C10.5 6.44772 10.9477 6 11.5 6H24C24.5523 6 25 6.44772 25 7V19.5C25 20.0523 24.5523 20.5 24 20.5C23.4477 20.5 23 20.0523 23 19.5V8H11.5C10.9477 8 10.5 7.55228 10.5 7Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 27C4 26.4477 4.44772 26 5 26H27C27.5523 26 28 26.4477 28 27C28 27.5523 27.5523 28 27 28H5C4.44772 28 4 27.5523 4 27Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowfatlineUprightIcon
