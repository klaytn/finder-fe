import { colors, Label } from '@klaytn/slush'

interface IContractButtonProps {
    title: string
}

const ContractButton = ({ title }: IContractButtonProps) => {
    return (
        <Label varient="filled" size="xlarge" override={{ backgroundColor: colors.blue[600] }}>
            {title}
        </Label>
    )
}

export default ContractButton
