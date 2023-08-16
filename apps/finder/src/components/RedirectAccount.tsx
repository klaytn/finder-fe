import { useParams } from 'react-router'
import { Navigate } from 'react-router-dom'

const RedirectAccount = () => {
    const params = useParams()
    const address = params.address as string

    return <Navigate to={`/account/${address}`} />
}

export default RedirectAccount
