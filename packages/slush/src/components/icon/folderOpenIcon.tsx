import { IconProps } from './type'

const FolderOpenIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4 26V8C4 7.73478 4.10536 7.48043 4.29289 7.29289C4.48043 7.10536 4.73478 7 5 7H11.6625C11.8787 7.00089 12.089 7.07098 12.2625 7.2L15.7375 9.8C15.911 9.92902 16.1213 9.99911 16.3375 10H25C25.2652 10 25.5196 10.1054 25.7071 10.2929C25.8946 10.4804 26 10.7348 26 11V14"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4 26L7.775 14.6875C7.8408 14.4875 7.96806 14.3133 8.13865 14.1899C8.30923 14.0664 8.51443 14 8.725 14H28.6125C28.7706 14 28.9265 14.0375 29.0673 14.1094C29.2082 14.1813 29.3299 14.2856 29.4227 14.4137C29.5154 14.5418 29.5764 14.69 29.6007 14.8463C29.625 15.0025 29.6119 15.1623 29.5625 15.3125L26 26H4Z"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default FolderOpenIcon
