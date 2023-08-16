import { IconProps } from './type'

const WavycircleWarningOnIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M28.2375 12.85C27.7625 12.3625 27.275 11.85 27.0875 11.4125C26.9 10.975 26.9125 10.325 26.9 9.6625C26.8875 8.45 26.8625 7.0625 25.9 6.1C24.9375 5.1375 23.55 5.1125 22.3375 5.1C21.675 5.0875 21 5.075 20.5875 4.9125C20.175 4.75 19.6375 4.2375 19.15 3.7625C18.2875 2.9375 17.3 2 16 2C14.7 2 13.7125 2.9375 12.85 3.7625C12.3625 4.2375 11.85 4.725 11.4125 4.9125C10.975 5.1 10.325 5.0875 9.6625 5.1C8.45 5.1125 7.0625 5.1375 6.1 6.1C5.1375 7.0625 5.1125 8.45 5.1 9.6625C5.0875 10.325 5.075 11 4.9125 11.4125C4.75 11.825 4.2375 12.3625 3.7625 12.85C2.9375 13.7125 2 14.7 2 16C2 17.3 2.9375 18.2875 3.7625 19.15C4.2375 19.6375 4.725 20.15 4.9125 20.5875C5.1 21.025 5.0875 21.675 5.1 22.3375C5.1125 23.55 5.1375 24.9375 6.1 25.9C7.0625 26.8625 8.45 26.8875 9.6625 26.9C10.325 26.9125 11 26.925 11.4125 27.0875C11.825 27.25 12.3625 27.7625 12.85 28.2375C13.7125 29.0625 14.7 30 16 30C17.3 30 18.2875 29.0625 19.15 28.2375C19.6375 27.7625 20.15 27.275 20.5875 27.0875C21.025 26.9 21.675 26.9125 22.3375 26.9C23.55 26.8875 24.9375 26.8625 25.9 25.9C26.8625 24.9375 26.8875 23.55 26.9 22.3375C26.9125 21.675 26.925 21 27.0875 20.5875C27.25 20.175 27.7625 19.6375 28.2375 19.15C29.0625 18.2875 30 17.3 30 16C30 14.7 29.0625 13.7125 28.2375 12.85ZM15 10C15 9.73478 15.1054 9.48043 15.2929 9.29289C15.4804 9.10536 15.7348 9 16 9C16.2652 9 16.5196 9.10536 16.7071 9.29289C16.8946 9.48043 17 9.73478 17 10V17C17 17.2652 16.8946 17.5196 16.7071 17.7071C16.5196 17.8946 16.2652 18 16 18C15.7348 18 15.4804 17.8946 15.2929 17.7071C15.1054 17.5196 15 17.2652 15 17V10ZM16 23C15.7033 23 15.4133 22.912 15.1666 22.7472C14.92 22.5824 14.7277 22.3481 14.6142 22.074C14.5006 21.7999 14.4709 21.4983 14.5288 21.2074C14.5867 20.9164 14.7296 20.6491 14.9393 20.4393C15.1491 20.2296 15.4164 20.0867 15.7074 20.0288C15.9983 19.9709 16.2999 20.0007 16.574 20.1142C16.8481 20.2277 17.0824 20.42 17.2472 20.6666C17.412 20.9133 17.5 21.2033 17.5 21.5C17.5 21.8978 17.342 22.2794 17.0607 22.5607C16.7794 22.842 16.3978 23 16 23Z"
                fill={color}
            />
        </svg>
    )
}

export default WavycircleWarningOnIcon
