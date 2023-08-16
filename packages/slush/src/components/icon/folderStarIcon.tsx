import { IconProps } from './type'

const FolderStarIcon = ({ size, color = '#19171C' }: IconProps) => {
    return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11.6666C12.0964 6.00177 12.5143 6.14108 12.8592 6.39754L12.8616 6.39931L16.3342 8.99754C16.3343 8.9976 16.3341 8.99748 16.3342 8.99754C16.3362 8.99894 16.3388 8.99991 16.3412 9H27C27.5304 9 28.0391 9.21071 28.4142 9.58579C28.7893 9.96086 29 10.4696 29 11V15C29 15.5523 28.5523 16 28 16C27.4477 16 27 15.5523 27 15V11H16.3334C15.9036 10.9982 15.4857 10.8589 15.1408 10.6025L15.1384 10.6007L11.6658 8.00246C11.6657 8.0024 11.6659 8.00252 11.6658 8.00246C11.6638 8.00106 11.6612 8.00009 11.6588 8L5 8L5 25H15C15.5523 25 16 25.4477 16 26C16 26.5523 15.5523 27 15 27H5C4.46957 27 3.96086 26.7893 3.58579 26.4142C3.21071 26.0391 3 25.5304 3 25V8C3 7.46957 3.21071 6.96086 3.58579 6.58579Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.5 15C23.8994 15 24.2606 15.2377 24.4185 15.6046L25.8422 18.9124L29.5776 19.203C29.984 19.2346 30.3305 19.5098 30.4534 19.8985C30.5764 20.2871 30.451 20.7115 30.1367 20.9711L27.3223 23.2951L28.183 26.7589C28.2801 27.1497 28.1333 27.5607 27.8104 27.8015C27.4876 28.0424 27.0518 28.066 26.7048 27.8616L23.5 25.9732L20.2951 27.8616C19.9481 28.066 19.5124 28.0424 19.1895 27.8015C18.8667 27.5607 18.7199 27.1497 18.817 26.7589L19.6776 23.2951L16.8633 20.9711C16.5489 20.7115 16.4236 20.2871 16.5465 19.8985C16.6694 19.5098 17.016 19.2346 17.4224 19.203L21.1577 18.9124L22.5815 15.6046C22.7394 15.2377 23.1005 15 23.5 15ZM23.5 18.5294L22.756 20.2579C22.6092 20.599 22.2854 20.8307 21.9151 20.8595L20.0453 21.005L21.4367 22.1539C21.7335 22.399 21.8633 22.7926 21.7705 23.1661L21.3325 24.929L22.9923 23.9509C23.3056 23.7664 23.6944 23.7664 24.0076 23.9509L25.6675 24.929L25.2295 23.1661C25.1367 22.7926 25.2665 22.399 25.5633 22.1539L26.9546 21.005L25.0849 20.8595C24.7146 20.8307 24.3908 20.599 24.244 20.2579L23.5 18.5294Z"
                fill={color}
            />
        </svg>
    )
}

export default FolderStarIcon
