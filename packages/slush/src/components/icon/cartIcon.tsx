import { IconProps } from './type'

const CartIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10 29C11.1046 29 12 28.1046 12 27C12 25.8954 11.1046 25 10 25C8.89543 25 8 25.8954 8 27C8 28.1046 8.89543 29 10 29Z"
                fill={color}
            />
            <path
                d="M23 29C24.1046 29 25 28.1046 25 27C25 25.8954 24.1046 25 23 25C21.8954 25 21 25.8954 21 27C21 28.1046 21.8954 29 23 29Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.09962 3C3.53426 2.99969 3.95719 3.14098 4.30437 3.40249C4.65174 3.66414 4.90435 4.03189 5.02394 4.45L6.03903 8H27.7125C28.0263 8 28.3219 8.14729 28.5108 8.3978C28.6998 8.64832 28.7602 8.973 28.674 9.27472L25.3752 20.8204C25.3751 20.8211 25.3749 20.8218 25.3747 20.8224C25.1974 21.4517 24.8187 22.0055 24.2965 22.3988C23.7746 22.7919 23.1383 23.0031 22.4849 23C22.4839 23 22.4828 23 22.4817 23L22.4875 22V23H22.4849H10.5151C10.5161 23 10.5172 23 10.5183 23L10.5125 22V23H10.5151C9.86174 23.0031 9.22539 22.7919 8.7035 22.3988C8.18143 22.0056 7.80274 21.452 7.62546 20.8229L7.62603 20.8249L8.5875 20.55L7.62476 20.8204L3.10106 5L1 5C0.447715 5 0 4.55229 0 4C0 3.44772 0.447715 3 1 3H3.09962ZM3.09962 3C3.09984 3 3.09939 3 3.09962 3ZM6.61091 10L9.55025 20.2796C9.60874 20.4878 9.73402 20.6711 9.90681 20.8013C10.0796 20.9315 10.2904 21.0013 10.5067 21L10.5125 21L22.4933 21C22.7096 21.0013 22.9204 20.9315 23.0932 20.8013C23.266 20.6711 23.3913 20.4878 23.4498 20.2796L23.451 20.2753L26.3868 10H6.61091Z"
                fill={color}
            />
        </svg>
    )
}

export default CartIcon
