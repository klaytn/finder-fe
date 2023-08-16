import { IconProps } from './type'

const FilterAltIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4.08307 3.49992H9.91641L6.99391 7.17492L4.08307 3.49992ZM2.4789 3.27242C3.65724 4.78325 5.83307 7.58325 5.83307 7.58325V11.0833C5.83307 11.4041 6.09557 11.6666 6.4164 11.6666H7.58307C7.90391 11.6666 8.16641 11.4041 8.16641 11.0833V7.58325C8.16641 7.58325 10.3364 4.78325 11.5147 3.27242C11.8122 2.88742 11.5381 2.33325 11.0539 2.33325H2.93974C2.45557 2.33325 2.1814 2.88742 2.4789 3.27242Z"
                fill={color}
            />
        </svg>
    )
}

export default FilterAltIcon
