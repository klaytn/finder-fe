import { IconProps } from './type'

const CheckboxActiveIcon = ({ size }: IconProps) => (
    <svg width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width={16} height={16} rx={5} fill="#A5A3FF" />
        <path
            d="M12 4.5c-.28 0-.53.11-.71.29L7 9.09l-2.29-2.3a1.003 1.003 0 0 0-1.42 1.42l3 3c.18.18.43.29.71.29.28 0 .53-.11.71-.29l5-5A1.003 1.003 0 0 0 12 4.5Z"
            fill="#fff"
        />
    </svg>
)

export default CheckboxActiveIcon
