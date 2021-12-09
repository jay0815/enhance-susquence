import React, { Suspense, isValidElement, Children } from 'react'

const initialState = {
  message: '',
  trance: null,
  isError: false
}

const displayName = Symbol('EnhanceSusquence')

class EnhanceSusquence extends React.Component {

  state = initialState;

  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError', error);
    return { isError: true };
  }

  componentDidCatch(message, trance) {
    console.log('componentDidCatch', message, trance);
    this.setState({ message, trance });
  }

  getErrorElement = (error) => {
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
    const Error = this.getErrorElement(error);
    const { isError } = this.state;
    return Children.map(children, (child) => {
      if (child.type.uuid === displayName) {
        return child
      }
      return (
        <Suspense fallback={loading}>
          {
            isError ? Error : child
          }
        </Suspense>
      )
    });
  }
}

EnhanceSusquence.uuid = displayName;

export default EnhanceSusquence;