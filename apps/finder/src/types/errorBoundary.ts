export type ErrorContent = {
    title: (props: Record<string, string>) => JSX.Element
    desc: () => JSX.Element
}

export type ErrorContents = Record<string, ErrorContent>
