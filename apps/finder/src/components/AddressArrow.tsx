import { ArrowRightIcon } from '@klaytn/slush'

export interface IAddressArrowProps {
    failed?: boolean
}

const AddressArrow = (props: IAddressArrowProps) => {
    const failed = props.failed || false
    const iconColor = failed ? '#EB4C4C' : '#756BFF'

    return (
        <div style={{ marginLeft: 16, marginRight: 14 }}>
            <ArrowRightIcon size={12} color={iconColor} />
        </div>
    )
}

export default AddressArrow
