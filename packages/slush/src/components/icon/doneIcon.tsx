import { IconProps } from './type'

const RECT_RATIO = 0.925

const DoneIcon = ({ size, color = '#19171C' }: IconProps) => {
    const numSize = typeof size === 'string' ? parseInt(size) : size || 0
    const rectSize = numSize * RECT_RATIO

    return (
        <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_730_5045)">
                <path
                    d="M6.91623 11.9168L3.99957 9.00011L3.02734 9.97233L6.91623 13.8612L15.2496 5.52789L14.2773 4.55566L6.91623 11.9168Z"
                    fill={color}
                />
            </g>
            <defs>
                <clipPath id="clip0_730_5045">
                    <rect width={rectSize} height={rectSize} fill={color} transform="translate(0.666016 0.666748)" />
                </clipPath>
            </defs>
        </svg>
    )
}

export default DoneIcon
