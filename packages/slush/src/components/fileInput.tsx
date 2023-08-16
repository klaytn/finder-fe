import { forwardRef, InputHTMLAttributes, useCallback, useImperativeHandle, useRef } from 'react'
import styled from 'styled-components'

import { Button } from './button'
import { Input } from './input'

type InputProps = Parameters<typeof Input>[0]
type FileInputProps = Pick<InputProps, 'placeholder' | 'onClear' | 'valid'> &
    InputHTMLAttributes<HTMLInputElement> & { value: string }

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
    // eslint-disable-next-line react/prop-types
    ({ value, onChange, placeholder = 'file name', accept, ...restProps }, outerRef) => {
        const innerRef = useRef<HTMLInputElement>(null)

        useImperativeHandle(outerRef, () => innerRef.current as HTMLInputElement)

        const handleSelectFile = useCallback(() => {
            innerRef.current?.click()
        }, [])

        const [fileName] = value.split('\\').reverse()

        return (
            <>
                <Input
                    leftButton={
                        <Button size={28} onClick={handleSelectFile} type="button">
                            Upload file
                        </Button>
                    }
                    {...restProps}
                    accept={accept}
                    value={fileName}
                    placeholder={placeholder}
                    readOnly
                    onClick={handleSelectFile}
                    hasClearButton
                />
                <NoneDisplayInput ref={innerRef} type="file" value={value} onChange={onChange} accept={accept} />
            </>
        )
    },
)

FileInput.displayName = 'FileInput'

const NoneDisplayInput = styled.input`
    display: none;
`

export default FileInput
