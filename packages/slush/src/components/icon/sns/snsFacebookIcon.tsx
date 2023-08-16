import { IconProps, IconSvg } from '../type'

export const SnsFacebookBlackIcon = ({ size, useOuterColor }: IconProps) => {
    return (
        <IconSvg
            width={size}
            height={size}
            viewBox="0 0 256 257"
            useOuterColor={useOuterColor}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#sns_facebook_black_icon_clip_path)">
                <rect y="0.439453" width="256" height="256" rx="128" fill="#19171C" />
                <path
                    d="M111.868 255.433V169.648H81V134.691H111.868V108.049C111.868 77.7412 130.018 61 157.787 61C171.088 61 185 63.3619 185 63.3619V93.1219H169.671C154.569 93.1219 149.858 102.454 149.858 112.017V134.691H183.575L178.185 169.648H149.858V254.58C142.755 255.803 135.452 256.439 128 256.439C122.536 256.439 117.152 256.097 111.868 255.433Z"
                    fill="white"
                />
            </g>
            <defs>
                <clipPath id="sns_facebook_black_icon_clip_path">
                    <rect width="256" height="256" fill="white" transform="translate(0 0.439453)" />
                </clipPath>
            </defs>
        </IconSvg>
    )
}

export const SnsFacebookWhiteIcon = ({ size, color, useOuterColor }: IconProps) => {
    return (
        <IconSvg
            width={size}
            height={size}
            useOuterColor={useOuterColor}
            viewBox="0 0 256 257"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#sns_facebook_white_icon_clip_path)">
                <path d="M128 0.439453C57.3076 0.439453 0 57.747 0 128.439C0 193.668 48.7907 247.5 111.868 255.433V169.648H81V134.691H111.868V108.049C111.868 77.7412 130.018 61 157.787 61C171.088 61 185 63.3619 185 63.3619V93.1219H169.671C154.569 93.1219 149.858 102.454 149.858 112.017V134.691H183.575L178.185 169.648H149.858V254.58C210.138 244.209 256 191.68 256 128.439C256 57.747 198.692 0.439453 128 0.439453Z" />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M149.858 254.58C210.138 244.209 256 191.68 256 128.439C256 57.747 198.692 0.439453 128 0.439453C57.3076 0.439453 0 57.747 0 128.439C0 193.668 48.7907 247.5 111.868 255.433V169.648H81V134.691H111.868V108.049C111.868 77.7412 130.018 61 157.787 61C171.088 61 185 63.3619 185 63.3619V93.1219H169.671C154.569 93.1219 149.858 102.454 149.858 112.017V134.691H183.575L178.185 169.648H149.858V254.58Z"
                />
            </g>
            <defs>
                <clipPath id="sns_facebook_white_icon_clip_path">
                    <rect width="256" height="256" fill="white" transform="translate(0 0.439453)" />
                </clipPath>
            </defs>
        </IconSvg>
    )
}

export const SnsFacebookColorIcon = ({ size }: IconProps) => {
    return (
        <IconSvg width={size} height={size} viewBox="0 0 256 257" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#sns_facebook_color_icon_clip_path)">
                <rect y="0.439453" width="256" height="256" rx="128" fill="#1877F2" />
                <path
                    d="M111.868 255.433V169.648H81V134.691H111.868V108.049C111.868 77.7412 130.018 61 157.787 61C171.088 61 185 63.3619 185 63.3619V93.1219H169.671C154.569 93.1219 149.858 102.454 149.858 112.017V134.691H183.575L178.185 169.648H149.858V254.58C142.755 255.803 135.452 256.439 128 256.439C122.536 256.439 117.152 256.097 111.868 255.433Z"
                    fill="white"
                />
            </g>
            <defs>
                <clipPath id="sns_facebook_color_icon_clip_path">
                    <rect width="256" height="256" fill="white" transform="translate(0 0.439453)" />
                </clipPath>
            </defs>
        </IconSvg>
    )
}
