import { Suspense, isValidElement, Children, Component } from 'react'
import type { ErrorInfo } from 'react'
import type { EnhanceSusquenceState, EnhanceSusquenceProps, EnhanceReactElement, SafeReactNode } from './interface';

const initialState: EnhanceSusquenceState = {
  isError: false
}

const uuid = Symbol('EnhanceSusquence');

class EnhanceSusquence extends Component<EnhanceSusquenceProps, EnhanceSusquenceState> {

  state = initialState;

  static uuid = uuid;

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch(message: Error, trance: ErrorInfo) {
    this.setState({ message, trance });
  }

  getErrorElement = (error: SafeReactNode) => {
    if (isValidElement(error)) {
      return error;
    } else if (typeof error === 'function') {
      try {
        return error();
      } catch (e) {
        return null;
      } 
    }
    return null;
  }

  render() {
    const { loading, error, children } = this.props;
    const ErrorElement = this.getErrorElement(error);
    const { isError } = this.state;
    return Children.map(children, (child) => {
      if (child && isValidElement(child) && (child as unknown as EnhanceReactElement).type.uuid === uuid) {
        return child
      }
      return (
        <Suspense fallback={loading}>
          {
            isError ? ErrorElement : child
          }
        </Suspense>
      )
    });
  }
}

export default EnhanceSusquence;