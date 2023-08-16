import { IconProps } from './type'

const ShapeTriangleOnIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M167.501 3.40261C167.957 3.13857 168.474 2.99951 169 2.99951C169.526 2.99951 170.043 3.13857 170.499 3.40261C170.953 3.66621 171.33 4.04502 171.592 4.50081L171.593 4.50313L182.591 23.4998C182.854 23.9551 182.992 24.4715 182.993 24.9972C182.993 25.5229 182.856 26.0395 182.594 26.4953C182.332 26.951 181.954 27.3299 181.5 27.5939C181.045 27.858 180.529 27.998 180.004 27.9998L180 27.9998H158L157.996 27.9998C157.471 27.998 156.955 27.858 156.5 27.5939C156.046 27.3299 155.668 26.951 155.406 26.4953C155.144 26.0395 155.007 25.5229 155.007 24.9972C155.008 24.4715 155.146 23.9551 155.409 23.4998L166.407 4.50313L166.408 4.50081C166.67 4.04502 167.047 3.66621 167.501 3.40261Z"
                fill={color}
            />
        </svg>
    )
}

export default ShapeTriangleOnIcon
