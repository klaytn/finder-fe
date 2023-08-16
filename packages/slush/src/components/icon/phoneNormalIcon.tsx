import { IconProps } from './type'

const PhoneNormalIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.1104 3.05815C10.5426 3.0027 10.9811 3.09084 11.3583 3.30899C11.7338 3.52617 12.028 3.86022 12.1959 4.26011L14.7047 10.1142C14.7051 10.115 14.7055 10.1158 14.7058 10.1167C14.8357 10.4169 14.89 10.7443 14.8639 11.0704C14.8377 11.3974 14.7316 11.7129 14.5547 11.9892L14.5481 11.9995L12.4645 15.1684C13.3944 17.0863 14.9454 18.6335 16.8655 19.5587L16.8695 19.556L19.9921 17.4701C20.2692 17.283 20.589 17.1688 20.922 17.1382C21.255 17.1075 21.5903 17.1613 21.8969 17.2947C21.8982 17.2952 21.8995 17.2958 21.9007 17.2963L27.7404 19.8044C28.1401 19.9723 28.474 20.2663 28.6911 20.6417C28.9092 21.019 28.9973 21.4574 28.9419 21.8896C28.7256 23.578 27.9015 25.1297 26.6238 26.2544C25.3461 27.3791 23.7024 27.9997 22.0002 28C17.2263 28 12.6477 26.1036 9.27208 22.728C5.89642 19.3523 4 14.7739 4 10C4.00038 8.29787 4.62098 6.65394 5.74566 5.37625C6.87027 4.09865 8.42217 3.27453 10.1104 3.05815ZM11.5625 15.6L10.6605 16.0317C10.5128 15.7231 10.4467 15.3818 10.4686 15.0404C10.4905 14.699 10.5996 14.3689 10.7855 14.0817L10.7894 14.0757L12.8702 10.9108L12.8683 10.9065L10.3559 5.04396C9.1534 5.20026 8.04823 5.78739 7.2469 6.69772C6.44361 7.6103 6.00033 8.78429 6 10M11.5625 15.6L10.6625 16.0359C11.79 18.3642 13.6727 20.2422 16.004 21.3637L16.0095 21.3663C16.3234 21.515 16.6706 21.5793 17.0169 21.553C17.3623 21.5268 17.695 21.4113 17.9823 21.2178C17.9831 21.2173 17.9838 21.2168 17.9845 21.2163L21.1055 19.1316L26.9554 21.6439L26.9569 21.6446C26.8006 22.847 26.2126 23.9518 25.3023 24.7531C24.3897 25.5564 23.2158 25.9997 22 26M6 10C6.00006 14.2434 7.68576 18.3132 10.6863 21.3137C13.6868 24.3143 17.7566 26 22 26"
                fill={color}
            />
        </svg>
    )
}

export default PhoneNormalIcon
