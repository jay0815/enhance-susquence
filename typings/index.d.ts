import { Component } from 'react';
import type { ErrorInfo } from 'react';
import type { EnhanceSusquenceState, EnhanceSusquenceProps, SafeReactNode } from './interface';
declare class EnhanceSusquence extends Component<EnhanceSusquenceProps, EnhanceSusquenceState> {
    state: EnhanceSusquenceState;
    static uuid: symbol;
    static getDerivedStateFromError(): {
        isError: boolean;
    };
    componentDidCatch(message: Error, trance: ErrorInfo): void;
    getErrorElement: (error: SafeReactNode) => any;
    render(): JSX.Element[] | null | undefined;
}
export default EnhanceSusquence;
