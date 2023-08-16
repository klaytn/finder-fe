import { IconProps } from './type'

const SegmentFlowarrowIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.5 19.5C4.11929 19.5 3 20.6193 3 22C3 23.3807 4.11929 24.5 5.5 24.5C6.88071 24.5 8 23.3807 8 22C8 20.6193 6.88071 19.5 5.5 19.5ZM1 22C1 19.5147 3.01472 17.5 5.5 17.5C7.98528 17.5 10 19.5147 10 22C10 24.4853 7.98528 26.5 5.5 26.5C3.01472 26.5 1 24.4853 1 22Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24.2929 4.29289C24.6834 3.90237 25.3166 3.90237 25.7071 4.29289L30.7071 9.29289C31.0976 9.68342 31.0976 10.3166 30.7071 10.7071L25.7071 15.7071C25.3166 16.0976 24.6834 16.0976 24.2929 15.7071C23.9024 15.3166 23.9024 14.6834 24.2929 14.2929L28.5858 10L24.2929 5.70711C23.9024 5.31658 23.9024 4.68342 24.2929 4.29289Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 11C20.6739 11 19.4021 11.5268 18.4645 12.4645C17.5268 13.4021 17 14.6739 17 16C17 17.8565 16.2625 19.637 14.9497 20.9497C13.637 22.2625 11.8565 23 10 23H9C8.44772 23 8 22.5523 8 22C8 21.4477 8.44772 21 9 21H10C11.3261 21 12.5979 20.4732 13.5355 19.5355C14.4732 18.5979 15 17.3261 15 16C15 14.1435 15.7375 12.363 17.0503 11.0503C18.363 9.7375 20.1435 9 22 9H30C30.5523 9 31 9.44772 31 10C31 10.5523 30.5523 11 30 11H22Z"
                fill={color}
            />
        </svg>
    )
}

export default SegmentFlowarrowIcon
