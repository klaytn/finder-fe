import { Icon, IconProps } from '@klaytn/slush'

const KlayBankPortalIcon: Icon = ({ size }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_1303_73813" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <path
                    d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12Z"
                    fill="white"
                />
            </mask>
            <g mask="url(#mask0_1303_73813)">
                <path
                    d="M12 0.5C18.3513 0.5 23.5 5.64873 23.5 12C23.5 18.3513 18.3513 23.5 12 23.5C5.64873 23.5 0.5 18.3513 0.5 12C0.5 5.64873 5.64873 0.5 12 0.5Z"
                    fill="white"
                    stroke="#015AEE"
                />
            </g>
            <g clipPath="url(#clip0_1303_73813)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.88069 6.05252L4.88069 6.28466L5.20391 6.05252H12.5362V6.27707L5.34466 9.41987H4.88071V9.62262L4.88062 9.62266V6.05252H4.88069ZM4.88071 12.485L4.88067 12.4849L4.88067 17.819H4.88069L4.88069 17.5853L5.20607 17.819H12.8154V17.4905L5.62212 12.9527H4.88071V12.485ZM7.48684 11.6281L16.142 17.0457H18.7741L19.0884 16.8199V7.25552L18.7738 6.87132H16.142L7.48684 10.8875V11.6281ZM13.3274 17.8134V17.819H13.3362L13.3274 17.8134ZM13.0482 6.05335L13.0501 6.05252H13.0482V6.05335Z"
                    fill="url(#paint0_linear_1303_73813)"
                />
            </g>
            <defs>
                <linearGradient
                    id="paint0_linear_1303_73813"
                    x1="4.88061"
                    y1="17.7667"
                    x2="19.1507"
                    y2="6.12891"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#006EED" />
                    <stop offset="1" stopColor="#0051ED" />
                </linearGradient>
                <clipPath id="clip0_1303_73813">
                    <rect width="14.25" height="11.8125" fill="white" transform="translate(4.875 6.05252)" />
                </clipPath>
            </defs>
        </svg>
    )
}

export default KlayBankPortalIcon
