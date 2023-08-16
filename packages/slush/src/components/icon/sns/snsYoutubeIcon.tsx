import { IconProps, IconSvg } from '../type'

export const SnsYoutubeBlackIcon = ({ size, useOuterColor }: IconProps) => {
    return (
        <IconSvg
            width={size}
            height={size}
            viewBox="0 0 256 257"
            useOuterColor={useOuterColor}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#sns_youtube_black_icon_clip_path)">
                <rect y="0.439453" width="256" height="256" rx="128" fill="#19171C" />
                <path
                    d="M200.824 91.7084C199.076 85.1313 193.926 79.9524 187.386 78.1948C175.531 75 128 75 128 75C128 75 80.4686 75 68.6135 78.1948C62.0748 79.9524 56.9237 85.1313 55.1757 91.7084C52.0004 103.629 52.0004 128.501 52.0004 128.501C52.0004 128.501 52.0004 153.372 55.1757 165.292C56.9237 171.869 62.0748 177.049 68.6135 178.806C80.4686 182 128 182 128 182C128 182 175.531 182 187.386 178.806C193.926 177.049 199.076 171.869 200.824 165.292C204 153.372 204 128.501 204 128.501C204 128.501 204 103.629 200.824 91.7084Z"
                    fill="white"
                />
                <path d="M113 151L152 128.5L113 106V151Z" fill="#19171C" />
            </g>
            <defs>
                <clipPath id="sns_youtube_black_icon_clip_path">
                    <rect width="256" height="256" fill="white" transform="translate(0 0.439453)" />
                </clipPath>
            </defs>
        </IconSvg>
    )
}

export const SnsYoutubeWhiteIcon = ({ size, color, useOuterColor }: IconProps) => {
    return (
        <IconSvg
            width={size}
            height={size}
            useOuterColor={useOuterColor}
            viewBox="0 0 256 257"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#sns_youtube_white_icon_clip_path)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M128 0.439453C57.3076 0.439453 0 57.747 0 128.439C0 199.132 57.3076 256.439 128 256.439C198.692 256.439 256 199.132 256 128.439C256 57.747 198.692 0.439453 128 0.439453ZM187.385 78.1948C193.926 79.9524 199.075 85.1313 200.823 91.7084C204 103.629 204 128.501 204 128.501C204 128.501 204 153.372 200.823 165.292C199.075 171.869 193.926 177.049 187.385 178.806C175.531 182 127.999 182 127.999 182C127.999 182 80.4682 182 68.6131 178.806C62.0745 177.049 56.9234 171.869 55.1754 165.292C52 153.372 52 128.501 52 128.501C52 128.501 52 103.629 55.1754 91.7084C56.9234 85.1313 62.0745 79.9524 68.6131 78.1948C80.4682 75 127.999 75 127.999 75C127.999 75 175.531 75 187.385 78.1948Z"
                />
                <path d="M113 151L152 128.5L113 106V151Z" />
            </g>
            <defs>
                <clipPath id="sns_youtube_white_icon_clip_path">
                    <rect width="256" height="256" fill="white" transform="translate(0 0.439453)" />
                </clipPath>
            </defs>
        </IconSvg>
    )
}

export const SnsYoutubeColorIcon = ({ size }: IconProps) => {
    return (
        <IconSvg width={size} height={size} viewBox="0 0 256 257" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#sns_youtube_color_icon_clip_path)">
                <rect y="0.439453" width="256" height="256" rx="128" fill="#ED1F24" />
                <path
                    d="M200.824 91.7084C199.076 85.1313 193.926 79.9524 187.386 78.1948C175.531 75 128 75 128 75C128 75 80.4686 75 68.6135 78.1948C62.0748 79.9524 56.9237 85.1313 55.1757 91.7084C52.0004 103.629 52.0004 128.501 52.0004 128.501C52.0004 128.501 52.0004 153.372 55.1757 165.292C56.9237 171.869 62.0748 177.049 68.6135 178.806C80.4686 182 128 182 128 182C128 182 175.531 182 187.386 178.806C193.926 177.049 199.076 171.869 200.824 165.292C204 153.372 204 128.501 204 128.501C204 128.501 204 103.629 200.824 91.7084Z"
                    fill="white"
                />
                <path d="M113 151L152 128.5L113 106V151Z" fill="#ED1F24" />
            </g>
            <defs>
                <clipPath id="sns_youtube_color_icon_clip_path">
                    <rect width="256" height="256" fill="white" transform="translate(0 0.439453)" />
                </clipPath>
            </defs>
        </IconSvg>
    )
}
