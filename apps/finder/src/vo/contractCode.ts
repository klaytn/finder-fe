import { AbiItem } from 'caver-js'

import { ContractCodeResponse } from '../api/account'

export type ContractCodeSpec = {
    abi: AbiItem[]
    viewAbi: AbiItem[]
    writeAbi: AbiItem[]
    executeAddress: string
}

export class ContractCodeVO {
    private readonly _abi: AbiItem[]
    private readonly _readAbi: AbiItem[]
    private readonly _writeAbi: AbiItem[]
    private readonly _implementationContractCode?: ContractCodeSpecVO
    private readonly _proxyContractCode?: ContractCodeSpecVO

    constructor(private readonly _rawData: ContractCodeResponse, private readonly _address: string) {
        this._abi = JSON.parse(this.rawAbi)
        this._readAbi = this._abi.filter(
            ({ type, stateMutability }) => type === 'function' && stateMutability === 'view',
        )
        this._writeAbi = this._abi.filter(
            ({ type, stateMutability }) => type === 'function' && stateMutability !== 'view',
        )

        if (_rawData.proxyContractType && _rawData.implementationContractCode) {
            // If it's a proxy contract, use the address of the proxy contract when executing the impl contract.
            this._implementationContractCode = new ContractCodeSpecVO(_rawData.implementationContractCode, _address)
        }

        if (_rawData.proxyContractCode) {
            this._proxyContractCode = new ContractCodeSpecVO(
                _rawData.proxyContractCode,
                _rawData.proxyContractCode.contractAddress,
            )
        }
    }

    get address() {
        return this._address
    }

    get executeAddress() {
        if (this.implementationContractType) {
            // If impl contract, use the address of the proxy contract when executed
            return this.proxyContractCode?.address || ''
        }

        return this._address
    }

    get name() {
        return this._rawData.contractName
    }

    get compilerVersion() {
        return this._rawData.compilerVersion
    }

    get sourceCode() {
        return this._rawData.contractSourceCode
    }

    get creationCode() {
        return this._rawData.contractCreationCode
    }

    get rawAbi() {
        return this._rawData.contractAbi
    }

    get abi() {
        return this._abi
    }

    get viewAbi() {
        return this._readAbi
    }

    get writeAbi() {
        return this._writeAbi
    }

    get abiEncodedValue() {
        return this._rawData.abiEncodedValue
    }

    get implementationContractCode() {
        return this._implementationContractCode
    }

    get implementationContractType() {
        return this._rawData.implementationContractType
    }

    get proxyContractCode() {
        return this._proxyContractCode
    }

    get proxyContractType() {
        return this._rawData.proxyContractType
    }
}

export class ContractCodeSpecVO {
    private readonly _abi: AbiItem[]
    private readonly _readAbi: AbiItem[]
    private readonly _writeAbi: AbiItem[]

    constructor(
        private readonly _rawData: Required<ContractCodeResponse>['implementationContractCode'],
        readonly executeAddress: string,
    ) {
        this._abi = JSON.parse(this.rawAbi)
        this._readAbi = this._abi.filter(
            ({ type, stateMutability }) => type === 'function' && stateMutability === 'view',
        )
        this._writeAbi = this._abi.filter(
            ({ type, stateMutability }) => type === 'function' && stateMutability !== 'view',
        )
    }

    get address() {
        return this._rawData.contractAddress
    }

    get name() {
        return this._rawData.contractName
    }

    get rawAbi() {
        return this._rawData.contractAbi
    }

    get abi() {
        return this._abi
    }

    get viewAbi() {
        return this._readAbi
    }

    get writeAbi() {
        return this._writeAbi
    }
}
