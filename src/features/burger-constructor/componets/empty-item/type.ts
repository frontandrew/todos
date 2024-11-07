import { PropsWithChildren } from 'react'

interface Props {
  expectType: 'bun' | 'other'
}

export type EmptyItemProps = PropsWithChildren<Props>
