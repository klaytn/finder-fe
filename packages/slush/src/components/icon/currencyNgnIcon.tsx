import { IconProps } from './type'

const CurrencyNgnIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 18C4 17.4477 4.44772 17 5 17H27C27.5523 17 28 17.4477 28 18C28 18.5523 27.5523 19 27 19H5C4.44772 19 4 18.5523 4 18Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 14C4 13.4477 4.44772 13 5 13H27C27.5523 13 28 13.4477 28 14C28 14.5523 27.5523 15 27 15H5C4.44772 15 4 14.5523 4 14Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.67467 4.80446C8.07834 4.66558 8.52566 4.79826 8.78832 5.13479L23 23.3435V5.75006C23 5.19777 23.4477 4.75006 24 4.75006C24.5523 4.75006 25 5.19777 25 5.75006V26.2501C25 26.677 24.729 27.0568 24.3253 27.1957C23.9217 27.3345 23.4743 27.2019 23.2117 26.8653L9 8.65661V26.2501C9 26.8023 8.55228 27.2501 8 27.2501C7.44772 27.2501 7 26.8023 7 26.2501V5.75006C7 5.32317 7.271 4.94334 7.67467 4.80446Z"
                fill={color}
            />
        </svg>
    )
}

export default CurrencyNgnIcon
