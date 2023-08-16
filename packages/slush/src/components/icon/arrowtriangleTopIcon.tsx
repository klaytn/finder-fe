import { IconProps } from './type'

const ArrowtriangleTopIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 19L16 11L24 19" fill={color} />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.2929 10.2929C15.6834 9.90237 16.3166 9.90237 16.7071 10.2929L24.7071 18.2929C24.9931 18.5789 25.0787 19.009 24.9239 19.3827C24.7691 19.7564 24.4045 20 24 20H8C7.59554 20 7.2309 19.7564 7.07612 19.3827C6.92134 19.009 7.00689 18.5789 7.29289 18.2929L15.2929 10.2929ZM10.4142 18H21.5858L16 12.4142L10.4142 18Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowtriangleTopIcon
