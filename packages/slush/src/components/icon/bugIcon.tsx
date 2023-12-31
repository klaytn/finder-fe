import { IconProps } from './type'

const BugIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19.5 13C20.3284 13 21 12.3284 21 11.5C21 10.6716 20.3284 10 19.5 10C18.6716 10 18 10.6716 18 11.5C18 12.3284 18.6716 13 19.5 13Z"
                fill={color}
            />
            <path
                d="M12.5 13C13.3284 13 14 12.3284 14 11.5C14 10.6716 13.3284 10 12.5 10C11.6716 10 11 10.6716 11 11.5C11 12.3284 11.6716 13 12.5 13Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 15C16.5523 15 17 15.4477 17 16V28C17 28.5523 16.5523 29 16 29C15.4477 29 15 28.5523 15 28V16C15 15.4477 15.4477 15 16 15Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.5 16C0.5 15.4477 0.947715 15 1.5 15H30.5C31.0523 15 31.5 15.4477 31.5 16C31.5 16.5523 31.0523 17 30.5 17H1.5C0.947715 17 0.5 16.5523 0.5 16Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 5C13.6131 5 11.3239 5.94821 9.63604 7.63604C7.94821 9.32387 7 11.6131 7 14V18C7 20.3869 7.94821 22.6761 9.63604 24.364C11.3239 26.0518 13.6131 27 16 27C18.3869 27 20.6761 26.0518 22.364 24.364C24.0518 22.6761 25 20.3869 25 18V14C25 11.6131 24.0518 9.32387 22.364 7.63604C20.6761 5.94821 18.3869 5 16 5ZM8.22183 6.22183C10.2847 4.15893 13.0826 3 16 3C18.9174 3 21.7153 4.15893 23.7782 6.22183C25.8411 8.28473 27 11.0826 27 14V18C27 20.9174 25.8411 23.7153 23.7782 25.7782C21.7153 27.8411 18.9174 29 16 29C13.0826 29 10.2847 27.8411 8.22183 25.7782C6.15893 23.7153 5 20.9174 5 18V14C5 11.0826 6.15893 8.28473 8.22183 6.22183Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24.5344 20.9243C24.811 20.4462 25.4227 20.2828 25.9007 20.5593L29.4882 22.6343C29.9663 22.9109 30.1297 23.5226 29.8532 24.0007C29.5767 24.4787 28.965 24.6421 28.4869 24.3656L24.8994 22.2906C24.4213 22.0141 24.2579 21.4024 24.5344 20.9243Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M29.8532 7.99949C30.1297 8.47756 29.9663 9.08928 29.4882 9.3658L25.9007 11.4408C25.4227 11.7173 24.811 11.5539 24.5344 11.0758C24.2579 10.5978 24.4213 9.98605 24.8994 9.70953L28.4869 7.63453C28.965 7.35802 29.5767 7.52141 29.8532 7.99949Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.14698 7.99949C2.4235 7.52141 3.03522 7.35802 3.5133 7.63453L7.1008 9.70953C7.57887 9.98605 7.74227 10.5978 7.46575 11.0758C7.18923 11.5539 6.57751 11.7173 6.09944 11.4408L2.51194 9.3658C2.03386 9.08928 1.87047 8.47756 2.14698 7.99949Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.46575 20.9243C7.74227 21.4024 7.57887 22.0141 7.1008 22.2906L3.5133 24.3656C3.03522 24.6421 2.4235 24.4787 2.14698 24.0007C1.87047 23.5226 2.03386 22.9109 2.51194 22.6343L6.09944 20.5593C6.57751 20.2828 7.18923 20.4462 7.46575 20.9243Z"
                fill={color}
            />
        </svg>
    )
}

export default BugIcon
