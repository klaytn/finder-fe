import { IconProps, IconSvg } from './type'

const MathMinusIcon = ({ size, color = '#19171C', useOuterColor }: IconProps) => {
    return (
        <IconSvg
            width={size}
            height={size}
            useOuterColor={useOuterColor}
            viewBox="0 0 32 32"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 16C4 15.4477 4.44772 15 5 15H27C27.5523 15 28 15.4477 28 16C28 16.5523 27.5523 17 27 17H5C4.44772 17 4 16.5523 4 16Z"
            />
        </IconSvg>
    )
}

export default MathMinusIcon
