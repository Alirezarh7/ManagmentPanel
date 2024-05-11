import React from 'react';
import '../Modal/Modal.css';

export interface IProps {
    ModalTitle: string
    onSubmit?: () => void
    children?: any
    buttons?: any
    Visible: boolean
    onCancel?: () => void
    width?: string
    height?: string
    size?: string
}

class NapModal extends React.Component<IProps> {
    state = { isShow: false, closing: false }
    componentDidUpdate(prevProps: IProps) {
        if (prevProps.Visible !== this.props.Visible) {
            if (this.props.Visible) {
                setTimeout(() => {
                    this.setState({ isShow: this.props.Visible, closing: true });
                }, 100);
            } else
                this.onClose();
        }
    }
    onClose = () => {
        if (this.props.onCancel) {
            this.setState({ isShow: false }, () => {
                setTimeout(() => {
                    if (this.props.onCancel)
                        this.props.onCancel()
                    this.setState({ closing: false });
                }, 100);
            })
        }
    }
    render() {
        if (!this.props.Visible && !this.state.closing)
            return null
        return (
            <React.Fragment>
                <div className={"modal fade" + (this.state.isShow ? " show" : "")} tabIndex={-1} role="dialog" style={{ display: "block", paddingRight: "17px" }}>
                    <div className={"modal-backdrop fade" + (this.state.isShow ? " show" : "")} onClick={this.onClose} style={{ zIndex: 998 }} />
                    <div className={"modal-dialog modal-dialog-scrollable" + (this.props.size ? " " + this.props.size : "")} style={{ zIndex: 999, minWidth: this.props.width ? this.props.width + "px" : "",minHeight: this.props.height ? this.props.height + "px" : 'unset' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h6 className="modal-title">{this.props.ModalTitle}</h6>
                                <button type="button" className="close" aria-label="Close" onClick={this.onClose}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.props.children}
                            </div>
                            {this.props.buttons ?
                                <div className="modal-footer">
                                    {this.props.buttons}
                                </div>
                                : ""}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default NapModal;