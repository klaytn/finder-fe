import { IconProps, IconSvg } from '../type'

export const SnsGoogleBlackIcon = ({ size, useOuterColor }: IconProps) => {
    return (
        <IconSvg
            width={size}
            height={size}
            viewBox="0 0 256 257"
            useOuterColor={useOuterColor}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#sns_google_black_icon_clip_path)">
                <rect y="0.439453" width="256" height="256" rx="128" fill="#19171C" />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M60.2359 162.11C73.4129 187.774 100.105 204 129.5 204C150.394 204 167.926 197.247 180.757 185.711L180.856 185.787C195.554 172.376 204 152.838 204 129.823C204 124.69 203.493 119.392 202.649 114.425H129.5V143.731H171.396C169.706 153.169 164.131 161.448 155.854 166.746C148.927 171.382 139.974 174.031 129.5 174.031C109.227 174.031 92.1648 160.62 85.9142 142.738L60.2359 162.11Z"
                    fill="white"
                />
                <path
                    d="M129.5 82.1376C140.48 81.972 151.292 86.1114 159.232 93.5622L181.363 71.7064C167.341 58.7916 148.758 51.8375 129.5 52.0031C100.105 52.0031 73.4129 68.2294 60.2359 93.8934C49.2551 115.418 49.2551 140.751 60.2359 162.11L85.9142 142.738C82.7044 133.3 82.7044 122.869 85.9142 113.431C92.1648 95.3835 109.227 82.1376 129.5 82.1376Z"
                    fill="white"
                />
            </g>
            <defs>
                <clipPath id="sns_google_black_icon_clip_path">
                    <rect width="256" height="256" fill="white" transform="translate(0 0.439453)" />
                </clipPath>
            </defs>
        </IconSvg>
    )
}

export const SnsGoogleWhiteIcon = ({ size, color, useOuterColor }: IconProps) => {
    return (
        <IconSvg
            width={size}
            height={size}
            useOuterColor={useOuterColor}
            viewBox="0 0 256 257"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#sns_google_white_icon_clip_path)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M128 0.439453C57.3076 0.439453 0 57.747 0 128.439C0 199.132 57.3076 256.439 128 256.439C198.692 256.439 256 199.132 256 128.439C256 57.747 198.692 0.439453 128 0.439453ZM129.499 82.1374C140.48 81.9718 151.292 86.1112 159.232 93.562L181.363 71.7062C167.341 58.7914 148.758 51.8373 129.499 52.0029C100.104 52.0029 73.4126 68.2292 60.2356 93.8932C49.2548 115.418 49.2548 140.751 60.2356 162.11C73.4126 187.774 100.104 204 129.499 204C150.393 204 167.926 197.246 180.756 185.711L180.856 185.787C195.553 172.375 204 152.838 204 129.823C204 124.69 203.493 119.392 202.648 114.424H129.499V143.731H171.395C169.706 153.169 164.131 161.447 155.853 166.746C148.927 171.382 139.973 174.031 129.499 174.031C109.227 174.031 92.1645 160.62 85.9139 142.738C82.7041 133.3 82.7041 122.869 85.9139 113.431C92.1645 95.3833 109.227 82.1374 129.499 82.1374Z"
                />
            </g>
            <defs>
                <clipPath id="sns_google_white_icon_clip_path">
                    <rect width="256" height="256" fill="white" transform="translate(0 0.439453)" />
                </clipPath>
            </defs>
        </IconSvg>
    )
}

export const SnsGoogleColorIcon = ({ size }: IconProps) => {
    return (
        <IconSvg width={size} height={size} viewBox="0 0 256 257" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#sns_google_color_icon_clip_path)">
                <rect x="0.5" y="0.939453" width="255" height="255" rx="127.5" fill="white" stroke="#DAD8DE" />
                <path
                    d="M203.065 129.807C203.065 124.714 202.564 119.457 201.73 114.529H129.501V143.607H170.87C169.202 152.971 163.697 161.185 155.524 166.442L180.212 185.335C194.724 172.028 203.065 152.642 203.065 129.807Z"
                    fill="#4280EF"
                />
                <path
                    d="M129.501 203.406C150.186 203.406 167.534 196.67 180.212 185.17L155.524 166.442C148.684 171.042 139.844 173.671 129.501 173.671C109.484 173.671 92.6362 160.364 86.4643 142.621L61.1091 161.842C74.1203 187.306 100.476 203.406 129.501 203.406Z"
                    fill="#34A353"
                />
                <path
                    d="M86.4643 142.457C83.2949 133.093 83.2949 122.907 86.4643 113.543L61.1091 94.1577C50.2664 115.514 50.2664 140.65 61.1091 161.842L86.4643 142.457Z"
                    fill="#F6B704"
                />
                <path
                    d="M129.501 82.4936C140.344 82.3294 151.02 86.4364 158.86 93.8292L180.712 72.1438C166.867 59.3298 148.518 52.4299 129.501 52.5942C100.476 52.5942 74.1203 68.6939 61.1091 94.1577L86.4643 113.543C92.6363 95.6363 109.484 82.4936 129.501 82.4936Z"
                    fill="#E54335"
                />
            </g>
            <defs>
                <clipPath id="sns_google_color_icon_clip_path">
                    <rect width="256" height="256" fill="white" transform="translate(0 0.439453)" />
                </clipPath>
            </defs>
        </IconSvg>
    )
}
