import { IconProps } from './type'

const Asterisk6Icon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 4C16.5523 4 17 4.44772 17 5V27C17 27.5523 16.5523 28 16 28C15.4477 28 15 27.5523 15 27V5C15 4.44772 15.4477 4 16 4Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.60902 10.0001C5.88519 9.52184 6.49679 9.358 6.97507 9.63417L26.0251 20.6342C26.5033 20.9103 26.6672 21.5219 26.391 22.0002C26.1148 22.4785 25.5032 22.6423 25.025 22.3662L5.97497 11.3662C5.49669 11.09 5.33285 10.4784 5.60902 10.0001Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26.391 10.0001C26.6672 10.4784 26.5033 11.09 26.0251 11.3662L6.97507 22.3662C6.49679 22.6423 5.88519 22.4785 5.60902 22.0002C5.33285 21.5219 5.49669 20.9103 5.97497 20.6342L25.025 9.63417C25.5032 9.358 26.1148 9.52184 26.391 10.0001Z"
                fill={color}
            />
        </svg>
    )
}

export default Asterisk6Icon
