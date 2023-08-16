import { IconProps } from './type'

const ArrowtriangleBottomIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 13L16 21L8 13" fill={color} />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.07612 12.6173C7.2309 12.2436 7.59554 12 8 12H24C24.4045 12 24.7691 12.2436 24.9239 12.6173C25.0787 12.991 24.9931 13.4211 24.7071 13.7071L16.7071 21.7071C16.3166 22.0976 15.6834 22.0976 15.2929 21.7071L7.29289 13.7071C7.00689 13.4211 6.92134 12.991 7.07612 12.6173ZM10.4142 14L16 19.5858L21.5858 14H10.4142Z"
                fill={color}
            />
        </svg>
    )
}

export default ArrowtriangleBottomIcon
