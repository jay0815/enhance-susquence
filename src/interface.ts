import type { ReactNode, ErrorInfo, ReactElement } from 'react'

export type SafeReactNode = NonNullable<ReactNode>|null;

export interface EnhanceSusquenceProps {
  loading:  SafeReactNode;
  error:  SafeReactNode;
}
export interface EnhanceSusquenceState {
  message?: Error,
  trance?: ErrorInfo,
  isError: boolean
}

export interface EnhanceReactElement extends ReactElement {
  type: ReactElement['type'] & {
    uuid: symbol;
  }
}
