import { IconProps } from './type'

const FileCopyIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10.6673 0.666748H2.66732C1.93398 0.666748 1.33398 1.26675 1.33398 2.00008V11.3334H2.66732V2.00008H10.6673V0.666748ZM10.0007 3.33341H5.33398C4.60065 3.33341 4.00732 3.93341 4.00732 4.66675L4.00065 14.0001C4.00065 14.7334 4.59398 15.3334 5.32732 15.3334H12.6673C13.4007 15.3334 14.0007 14.7334 14.0007 14.0001V7.33341L10.0007 3.33341ZM5.33398 14.0001V4.66675H9.33398V8.00008H12.6673V14.0001H5.33398Z"
                fill={color}
            />
        </svg>
    )
}

export default FileCopyIcon
