import React from 'react';
import './Modal.css';

export interface IProps {
    ModalTitle?: string
    onSubmit?: () => void
    children?: any
    Visible: boolean
    onCancel?: () => void
    width?: string
}


class Modal extends React.Component<IProps> {

    state = {
        isShow: false
    }


    componentDidUpdate(prevProps: IProps) {
        if (prevProps.Visible !== this.props.Visible) {
            setTimeout(() => {
                this.setState({ isShow: this.props.Visible })
            }, 100);
        }
    }

    onClose = () => {
        
        if (this.props.onCancel) {
        this.setState({ isShow: false }, () => {
            setTimeout(() => {
                if (this.props.onCancel) {
                    this.props.onCancel()
                }
            }, 100);
        })
    }

    }

    render() {
        if (!this.props.Visible) {
            return null
        }
        return (
            <div className={this.state.isShow ? "Modal-Parent Modal-Parent-active" : "Modal-Parent"} >
                <div className={this.state.isShow ? "Modal-Fade modalFade-active" : "Modal-Fade"}
                    onClick={this.onClose}
                >
                </div>
                
                <div
                    style={{ width: this.props.width ? this.props.width : "700px" }}
                    className={this.state.isShow ?
                        "Modal-Container modal-active" : "Modal-Container"}>
                    {this.props.children}
                </div>
                
            </div>
        );
    }
}

export default Modal;