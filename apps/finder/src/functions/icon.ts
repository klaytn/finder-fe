import { CircleiconConfirmOnIcon, CircleiconWarningOnIcon, colors } from '@klaytn/slush'

export const getStatusIcon = (isSuccess: boolean) => {
    return isSuccess
        ? {
              StatusIcon: CircleiconConfirmOnIcon,
              statusColor: colors.green[500],
          }
        : {
              StatusIcon: CircleiconWarningOnIcon,
              statusColor: colors.red[500],
          }
}
