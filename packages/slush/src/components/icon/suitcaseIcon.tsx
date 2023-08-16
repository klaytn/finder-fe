import { IconProps } from './type'

const SuitcaseIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 10C3 8.89543 3.89543 8 5 8H27C28.1046 8 29 8.89543 29 10V26C29 27.1046 28.1046 28 27 28H5C3.89543 28 3 27.1046 3 26V10ZM27 10H5V26H27V10Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.8787 4.87868C11.4413 4.31607 12.2044 4 13 4H19C19.7956 4 20.5587 4.31607 21.1213 4.87868C21.6839 5.44129 22 6.20435 22 7V27C22 27.5523 21.5523 28 21 28C20.4477 28 20 27.5523 20 27V7C20 6.73478 19.8946 6.48043 19.7071 6.29289C19.5196 6.10536 19.2652 6 19 6H13C12.7348 6 12.4804 6.10536 12.2929 6.29289C12.1054 6.48043 12 6.73478 12 7V27C12 27.5523 11.5523 28 11 28C10.4477 28 10 27.5523 10 27V7C10 6.20435 10.3161 5.44129 10.8787 4.87868Z"
                fill={color}
            />
        </svg>
    )
}

export default SuitcaseIcon
