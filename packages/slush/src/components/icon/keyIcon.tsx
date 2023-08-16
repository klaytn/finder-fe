import { IconProps } from './type'

const KeyIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.5607 4.15372C20.0089 3.84504 18.4003 4.00347 16.9385 4.60897C15.4767 5.21447 14.2273 6.23985 13.3482 7.55544C12.4692 8.87104 12 10.4178 12 12V12.0038H12C11.9962 13.0215 12.1919 14.0301 12.576 14.9725C12.7279 15.3452 12.6417 15.7726 12.3571 16.0571L5 23.4142V27H8V25C8 24.4477 8.44772 24 9 24H11V22C11 21.4477 11.4477 21 12 21H14.5858L15.9429 19.6429L16.65 20.35L17.0275 19.424C17.9699 19.8081 18.9785 20.0038 19.9962 20L20 20C21.5823 20 23.129 19.5308 24.4446 18.6518C25.7602 17.7727 26.7855 16.5233 27.391 15.0615C27.9965 13.5997 28.155 11.9911 27.8463 10.4393C27.5376 8.88743 26.7757 7.46197 25.6569 6.34315C24.538 5.22433 23.1126 4.4624 21.5607 4.15372ZM16.9053 21.5089L15.7071 22.7071C15.5196 22.8946 15.2652 23 15 23H13V25C13 25.5523 12.5523 26 12 26H10V28C10 28.5523 9.55228 29 9 29H4C3.44772 29 3 28.5523 3 28V23C3 22.7348 3.10536 22.4804 3.29289 22.2929L10.4911 15.0947C10.1625 14.097 9.99625 13.0515 10 11.9982C10.0004 10.021 10.5868 8.08828 11.6853 6.4443C12.7841 4.79981 14.3459 3.51809 16.1732 2.76121C18.0004 2.00433 20.0111 1.8063 21.9509 2.19215C23.8907 2.578 25.6725 3.53041 27.0711 4.92894C28.4696 6.32746 29.422 8.10929 29.8079 10.0491C30.1937 11.9889 29.9957 13.9996 29.2388 15.8268C28.4819 17.6541 27.2002 19.2159 25.5557 20.3147C23.9117 21.4132 21.979 21.9996 20.0019 22C20.0013 22 20.0006 22 20 22V21L20.0038 22C20.0031 22 20.0025 22 20.0019 22C18.9486 22.0038 17.903 21.8375 16.9053 21.5089Z"
                fill={color}
            />
            <path
                d="M22.5 11C23.3284 11 24 10.3284 24 9.5C24 8.67157 23.3284 8 22.5 8C21.6716 8 21 8.67157 21 9.5C21 10.3284 21.6716 11 22.5 11Z"
                fill={color}
            />
        </svg>
    )
}

export default KeyIcon
