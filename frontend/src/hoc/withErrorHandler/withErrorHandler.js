import React, { Component } from "react";

// import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        // error => {

        //     if (error.response.data) {
        //         if (error.response.data.detail) {
        //             console.log(
        //                 "[withErrorHandler] error response data detail %0",
        //                 error.response.data.detail
        //             );
        //         }

        //         switch (error.response.status) {
        //             case 503:
        //                 props.history.push("/503"); //we will redirect user into 503 page
        //                 break;
        //             default:
        //                 break;
        //         }
        //     }
        //     console.log(
        //         "[withErrorHandler] error response status  %0",
        //         error.response.status
        //     );

        //     this.setState({ error: error.response.data.detail });
        //     return Promise.reject(error);
        // }
        // );

        handleError(error) {
            //react-notifications-component notification configuration
            let notification = {
                titel: "",
                message: "Network Error.",
                type: "success", // 'default', 'success', 'info', 'warning'
                container: "bottom-left", // where to position the notifications
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"]
            };

            //Setup Error notification
            if (typeof error !== "undefined") {
                if (error.hasOwnProperty("message")) {
                    console.log(
                        "[withErrorHandler] error message %0",
                        error.message
                    );
                } else {
                    console.log(
                        "[withErrorHandler][WARNING] no error.message error"
                    );
                }

                if (typeof error.response !== "undefined") {
                    console.log(
                        "[withErrorHandler] error response %0",
                        error.response
                    );
                    console.log(
                        "[withErrorHandler] error response statusText %0",
                        error.response.statusText
                    );

                    // Notification container
                    // You have in total 6 containers for desktop and 2 for mobile, if component is set to be responsive. List of containers:
                    //     top-left
                    //     top-right
                    //     top-center
                    //     center
                    //     bottom-left
                    //     bottom-right
                    //     bottom-center
                    //
                    //
                    // success
                    // danger
                    // info
                    // default
                    // warning

                    //Setup Generic Response Messages

                    switch (error.response.config.url) {
                        case "/api/v1/accounts/jwt/create/":
                            if (error.response.status === 401) {
                                notification.message = "UnAuthorized";
                                notification.dutchTitle = "NietGeautoriseerd";
                                notification.dutchMessage =
                                    "Geen geactiveerd account gevonden";
                                notification.type = "warning";
                                notification.container = "center";
                            } else if (error.response.status === 200) {
                                notification.message = "Authorized";
                                notification.dutchTitle = "Geautoriseerd";
                                notification.dutchMessage = "Ingelogd";
                                notification.type = "success";
                                notification.container = "center";
                            } else {
                            }
                            break;
                        default:
                            break;
                    }

                    if (error.response.status === 401) {
                    } else if (error.response.status === 404) {
                        notification.message =
                            "API Route is Missing or Undefined";
                    } else if (error.response.status === 405) {
                        notification.message = "API Route Method Not Allowed";
                    } else if (error.response.status === 422) {
                        //Validation Message
                    } else if (error.response.status >= 500) {
                        notification.message = "Server Error";
                    }
                }
            } else {
            }

            error.notification = notification;
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(
                res => {
                    console.log(
                        "[withErrorHandler] request no error response %0",
                        res
                    );
                    return res;
                },
                req => {
                    this.setState({ error: null });
                    return req;
                }
            );

            this.resInterceptor = axios.interceptors.response.use(
                res => {
                    console.log(
                        "[withErrorHandler] response no error response %0",
                        res
                    );
                    return res;
                },
                error => {
                    this.handleError(error);
                    console.log(
                        "[withErrorHandler] axios.interceptors.response.use after handleError error.notification: %0 ",
                        error.notification
                    );
                    console.log(
                        "[withErrorHandler] axios.interceptors.response.use after handleError this.state.error: %0 ",
                        this.state.error
                    );
                    return Promise.reject({ ...error });
                }
            );
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            console.log("[withErrorHandler] errorConfirmedHandler");
            this.setState({ error: null });
        };

        render() {
            let test = null;
            console.log("[withErrorHandler] Error Status %0", this.state);
            // if (this.state.error) {
            // store.addNotification({
            //     title: "Error Message",
            //     message: this.state.error,
            //     type: "warning", // 'default', 'success', 'info', 'warning'
            //     container: "top-left", // where to position the notifications
            //     // container: "center", // where to position the notifications
            //     animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
            //     animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
            //     dismiss: {
            //         touch: true,
            //         click: true,
            //         duration: 30000,
            //         onScree: true,
            //         pauseOnHover: true
            //     },
            //     onRemoval: (id, removedBy) => {
            //         this.errorConfirmedHandler();
            //     }
            // });

            // }
            // WrappedComponent.defaultProps = {
            //     axiosError: this.state.error
            // };
            return (
                <Aux>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    };
};

export default withErrorHandler;
