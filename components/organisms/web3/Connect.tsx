// Hooks
import { useAccount, useConnect } from 'wagmi'
import useIsMounted from '../../../utils/useIsMounted'

// Components
import Profile from './Profile'
import Button from '../../atoms/Button'

// Types
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Connect: FC<Props> = ({ ...props }) => {
  const isMounted = useIsMounted()
  const { connect, connectors, error, isConnecting, pendingConnector } =
    useConnect()

  const { data: account } = useAccount()

  if (account) {
    return <Profile {...props} />
  }

  return (
    <div {...props}>
      {connectors.map((connector) => {
        const isPendingConnector =
          isConnecting && connector.id === pendingConnector?.id

        return (
          <Button
            key={connector.id}
            disabled={
              isMounted ? !connector.ready || isPendingConnector : false!
            }
            className="
              mb-4 block h-14 w-full px-16
            "
            onClick={() => connect(connector)}
          >
            {connector.name}
            {isMounted && !connector.ready && ' (unsupported)'}
            {isPendingConnector && ' (connecting)'}
          </Button>
        )
      })}

      {error && <div className="text-red-700">Error: {error.message}</div>}
    </div>
  )
}

export default Connect
