import { IconProps } from './type'

const LinkNormalIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.944 11.0424C21.3348 11.4326 21.3353 12.0658 20.9451 12.4566L12.4701 20.9441C12.0798 21.3349 11.4467 21.3354 11.0559 20.9451C10.6651 20.5549 10.6646 19.9217 11.0548 19.5309L19.5298 11.0434C19.9201 10.6526 20.5532 10.6521 20.944 11.0424Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.3446 13.1679C10.7351 13.5584 10.7351 14.1916 10.3446 14.5821L6.80709 18.1196C5.86911 19.0576 5.34216 20.3298 5.34216 21.6562C5.34216 22.9827 5.86911 24.2549 6.80709 25.1929C7.74506 26.1309 9.01723 26.6578 10.3437 26.6578C11.0005 26.6578 11.6509 26.5285 12.2577 26.2771C12.8646 26.0257 13.4159 25.6573 13.8804 25.1929L17.4179 21.6554C17.8084 21.2649 18.4416 21.2649 18.8321 21.6554C19.2226 22.0459 19.2226 22.6791 18.8321 23.0696L15.2946 26.6071C14.6444 27.2573 13.8726 27.773 13.0231 28.1249C12.1736 28.4767 11.2632 28.6578 10.3437 28.6578C8.4868 28.6578 6.70592 27.9202 5.39287 26.6071C4.07983 25.2941 3.34216 23.5132 3.34216 21.6562C3.34216 19.7993 4.07983 18.0184 5.39287 16.7054L8.93037 13.1679C9.3209 12.7774 9.95406 12.7774 10.3446 13.1679Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.7054 5.393C18.0184 4.07995 19.7993 3.34229 21.6562 3.34229C23.5132 3.34229 25.2941 4.07995 26.6071 5.393C27.9202 6.70605 28.6578 8.48692 28.6578 10.3439C28.6578 12.2008 27.9202 13.9817 26.6071 15.2947L23.0696 18.8322C22.6791 19.2227 22.0459 19.2227 21.6554 18.8322C21.2649 18.4417 21.2649 17.8085 21.6554 17.418L25.1929 13.8805C26.1309 12.9425 26.6578 11.6704 26.6578 10.3439C26.6578 9.01736 26.1309 7.74519 25.1929 6.80721C24.2549 5.86923 22.9827 5.34229 21.6562 5.34229C20.3298 5.34229 19.0576 5.86923 18.1196 6.80721L14.5821 10.3447C14.1916 10.7352 13.5584 10.7352 13.1679 10.3447C12.7774 9.95419 12.7774 9.32102 13.1679 8.9305L16.7054 5.393Z"
                fill={color}
            />
        </svg>
    )
}

export default LinkNormalIcon
