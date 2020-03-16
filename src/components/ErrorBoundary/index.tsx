import React from "react";
import styles from "./ErrorBoundary.module.css";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <p>There is a problem with the app</p>
          <p>
            Please contact a support team at{" "}
            <span className={styles.underline}>svetaibuben@gmail.com</span>
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
