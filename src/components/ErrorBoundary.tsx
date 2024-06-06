import { closeCircleOutline } from "ionicons/icons";
import React from "react";
import { Trans } from "react-i18next";

import { IonContent, IonIcon, IonPage } from "@/overrides/ionic/react";
import Text from "@/components/shared/Text";
import Center from "@/components/shared/Center";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: {} as Error };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // TODO: log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <IonPage>
          <IonContent>
            <Center>
              <IonIcon
                icon={closeCircleOutline}
                color="danger"
                style={{ width: 128, height: 128 }}
              />
              <Text variant="h1" className="my-2">
                Oops!
              </Text>
              <Text variant="h6" className="my-2" color="medium">
                <Trans i18nKey="COMMON.SOMETHING_WENT_WRONG" />
              </Text>
              <div
                className="my-2 mx-2"
                style={{
                  border: "1px solid var(--bk-border-color)",
                  borderRadius: 4,
                  backgroundColor: "#eee",
                }}
              >
                <Text
                  variant="body1"
                  className="m-4"
                  style={{
                    maxWidth: 800,
                    textAlign: "left",
                    wordBreak: "break-word",
                  }}
                >
                  {JSON.stringify(this.state.error)}
                </Text>
              </div>
            </Center>
          </IonContent>
        </IonPage>
      );
    }

    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
