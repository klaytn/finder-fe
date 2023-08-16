import { Icon, IconProps } from '@klaytn/slush'

const KlaytnSquarePortalIcon: Icon = ({ size }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#klaytn_square_portal_icon_clip_path)">
                <rect x="0.200195" width="24" height="24" rx="12" fill="#15C98F" />
                <path
                    d="M16.7124 6.64248C15.48 5.61871 13.9774 5.08068 12.4602 5.02783L8.87793 14.4259L16.7124 6.64195V6.64248Z"
                    fill="white"
                />
                <path
                    d="M17.6058 7.53174L13.1064 12.002L17.6052 16.4718C19.7784 13.8895 19.7789 10.1146 17.6058 7.53174Z"
                    fill="white"
                />
                <path
                    d="M10.6988 6.10059L5.20126 11.5626C5.09382 13.2723 5.61547 15.0135 6.76784 16.4141L10.6988 6.10112V6.10059Z"
                    fill="white"
                />
                <path
                    d="M12.2122 12.8901L7.71289 17.3604C10.3126 19.5195 14.1119 19.519 16.711 17.3599L12.2122 12.8901Z"
                    fill="white"
                />
            </g>
            <defs>
                <clipPath id="klaytn_square_portal_icon_clip_path">
                    <rect width="24" height="24" fill="white" transform="translate(0.200195)" />
                </clipPath>
            </defs>
        </svg>
    )
}

export default KlaytnSquarePortalIcon
