import { IconProps } from './type'

const StackSimpleIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.5039 4.13176C15.8113 3.95608 16.1887 3.95608 16.4961 4.13176L30.4961 12.1318C30.8077 12.3098 31 12.6411 31 13C31 13.3589 30.8077 13.6902 30.4961 13.8682L16.4961 21.8682C16.1887 22.0439 15.8113 22.0439 15.5039 21.8682L1.50386 13.8682C1.19229 13.6902 1 13.3589 1 13C1 12.6411 1.19229 12.3098 1.50386 12.1318L15.5039 4.13176ZM4.01556 13L16 19.8482L27.9844 13L16 6.15175L4.01556 13Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.13174 17.504C1.40575 17.0245 2.01661 16.8579 2.49613 17.1319L16 24.8484L29.5038 17.1319C29.9834 16.8579 30.5942 17.0245 30.8682 17.504C31.1422 17.9835 30.9756 18.5944 30.4961 18.8684L16.4961 26.8684C16.1887 27.0441 15.8113 27.0441 15.5038 26.8684L1.50385 18.8684C1.02433 18.5944 0.857735 17.9835 1.13174 17.504Z"
                fill={color}
            />
        </svg>
    )
}

export default StackSimpleIcon
