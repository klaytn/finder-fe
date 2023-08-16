import { IconProps } from './type'

const BookmarkNormalIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.58579 4.58579C7.96086 4.21071 8.46957 4 9 4H23C23.5304 4 24.0391 4.21071 24.4142 4.58579C24.7893 4.96086 25 5.46957 25 6V28C25 28.3635 24.8027 28.6984 24.4848 28.8746C24.1668 29.0509 23.7783 29.0407 23.47 28.848L16 24.1792L8.53 28.848C8.22173 29.0407 7.83319 29.0509 7.51523 28.8746C7.19728 28.6984 7 28.3635 7 28V6C7 5.46957 7.21071 4.96086 7.58579 4.58579ZM23 6H9L9 26.1958L15.47 22.152C15.7943 21.9493 16.2057 21.9493 16.53 22.152L23 26.1958V6Z"
                fill={color}
            />
        </svg>
    )
}

export default BookmarkNormalIcon
