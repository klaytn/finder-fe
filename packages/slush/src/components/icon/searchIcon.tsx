import { IconProps, IconSvg } from './type'

const SearchIcon = ({ size, color = '#19171C', useOuterColor }: IconProps) => {
    return (
        <IconSvg
            width={size}
            height={size}
            useOuterColor={useOuterColor}
            viewBox="0 0 20 21"
            fill={useOuterColor ? undefined : color}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12.9167 12.1667H12.2583L12.025 11.9417C12.8417 10.9917 13.3333 9.75833 13.3333 8.41667C13.3333 5.425 10.9083 3 7.91667 3C4.925 3 2.5 5.425 2.5 8.41667C2.5 11.4083 4.925 13.8333 7.91667 13.8333C9.25833 13.8333 10.4917 13.3417 11.4417 12.525L11.6667 12.7583V13.4167L15.8333 17.575L17.075 16.3333L12.9167 12.1667ZM7.91667 12.1667C5.84167 12.1667 4.16667 10.4917 4.16667 8.41667C4.16667 6.34167 5.84167 4.66667 7.91667 4.66667C9.99167 4.66667 11.6667 6.34167 11.6667 8.41667C11.6667 10.4917 9.99167 12.1667 7.91667 12.1667Z" />
        </IconSvg>
    )
}

export default SearchIcon
