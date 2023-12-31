import { Icon, IconProps } from '@klaytn/slush'

const NftIcon: Icon = ({ size, color }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 1C7.71573 1 1 7.71573 1 16C1 24.2843 7.71573 31 16 31C24.2843 31 31 24.2843 31 16C31 7.71573 24.2843 1 16 1ZM3.30769 16C3.30769 8.99023 8.99023 3.30769 16 3.30769C23.0098 3.30769 28.6923 8.99023 28.6923 16C28.6923 23.0098 23.0098 28.6923 16 28.6923C8.99023 28.6923 3.30769 23.0098 3.30769 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.5192 9.51412C11.1565 9.51412 11.6731 10.0307 11.6731 10.668V21.2834C11.6731 21.9206 11.1565 22.4372 10.5192 22.4372C9.88198 22.4372 9.36538 21.9206 9.36538 21.2834V10.668C9.36538 10.0307 9.88198 9.51412 10.5192 9.51412Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.4875 9.51412C22.1248 9.51412 22.6414 10.0307 22.6414 10.668V21.2834C22.6414 21.9206 22.1248 22.4372 21.4875 22.4372C20.8503 22.4372 20.3337 21.9206 20.3337 21.2834V10.668C20.3337 10.0307 20.8503 9.51412 21.4875 9.51412Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.80397 9.90529C10.259 9.45919 10.9896 9.46644 11.4357 9.9215L22.2132 20.4631C22.6593 20.9182 22.652 21.6487 22.197 22.0948C21.7419 22.5409 21.0114 22.5337 20.5653 22.0786L9.78777 11.537C9.34166 11.0819 9.34892 10.3514 9.80397 9.90529Z"
                fill={color}
            />
        </svg>
    )
}

export default NftIcon
