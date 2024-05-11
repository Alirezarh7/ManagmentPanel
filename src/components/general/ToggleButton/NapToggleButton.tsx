import React from 'react';
import "./NapToggleButton.css"
interface IProps {
    value: boolean
    onChangeActivate: () => any
}
export default class NapToggleButton extends React.Component<IProps>{
    state = {
        isActive: false
    }
    componentDidMount() {
        if(this.props.value){
            this.setState({isActive: this.props.value})
        }
    }
    onChangeHandler = () => {
        this.setState({isActive: !this.state.isActive })
        setTimeout(() => {
            this.props.onChangeActivate()
        }, 250);
    }
    render() {
        return (
            <label className="switch">
                <input type="checkbox" checked={this.state.isActive} onChange={this.onChangeHandler}/>
                    <span className="slider round"></span>
            </label>
                )
            }
}