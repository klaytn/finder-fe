import { Component, useEffect, useState } from 'react'

import { defaultInputDataResponse, getInputData, InputDataResponse } from '../../../api/transaction'
import Card from '../../../components/Card'

export interface IInputDataTabProps {
    tabId: string
    txHash: string
}

const InputDataTab = ({ txHash }: IInputDataTabProps) => {
    const [inputData, setInputData] = useState<InputDataResponse>(defaultInputDataResponse)

    const fetchInputData = async (txHash: string) => {
        getInputData(txHash).then((rsp) => setInputData(rsp.data))
    }

    useEffect(() => {
        fetchInputData(txHash)
    }, [txHash])

    return (
        <>
            <InputDataBox title="Original Value" first>
                {inputData.originalValue}
            </InputDataBox>
            <InputDataBox title="Decoded Value">
                {inputData.decodedValue === undefined && inputData.originalValue}
                {inputData.decodedValue !== undefined && (
                    <>
                        <span>function {inputData.decodedValue.signature}</span>
                        <br />
                        <br />
                        <span>Method ID : {inputData.decodedValue.methodId}</span>
                        <br />
                        {inputData.decodedValue.parameters.map((param, index) => {
                            return (
                                <div key={index} style={{ marginLeft: 5 }}>
                                    [{index}] {param.type} : {param.value}
                                </div>
                            )
                        })}
                    </>
                )}
            </InputDataBox>
            <InputDataBox title="UTF-8">{inputData.utf8Value}</InputDataBox>
        </>
    )
}

interface IInputDataBoxProps {
    title: string
    first?: boolean
}

class InputDataBox extends Component<IInputDataBoxProps> {
    render() {
        return (
            <Card margin={this.props.first ? 0 : undefined} condition={!!this.props.children}>
                <Card.Title>{this.props.title}</Card.Title>
                <Card.Content height={106}>{this.props.children}</Card.Content>
            </Card>
        )
    }
}

export default InputDataTab
