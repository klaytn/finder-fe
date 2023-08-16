import { IconProps } from './type'

const ErrorIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8.00065 1.33325C4.32065 1.33325 1.33398 4.31992 1.33398 7.99992C1.33398 11.6799 4.32065 14.6666 8.00065 14.6666C11.6807 14.6666 14.6673 11.6799 14.6673 7.99992C14.6673 4.31992 11.6807 1.33325 8.00065 1.33325ZM8.66732 11.3333H7.33398V9.99992H8.66732V11.3333ZM8.66732 8.66659H7.33398V4.66659H8.66732V8.66659Z"
                fill={color}
            />
        </svg>
    )
}

export default ErrorIcon
