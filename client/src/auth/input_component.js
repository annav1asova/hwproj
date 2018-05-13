import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export class InputComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            isValid: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({value: event.target.value,
                        isValid: this.props.isValid(event.target.value)});
    }

    render() {
        return (
            <FormGroup
                validationState={this.state.isValid === true ? 'success' : 'error'}
            >
                <ControlLabel>
                    {this.props.name}
                </ControlLabel>
                <FormControl
                    type={this.props.isPass ? "password" : "text"}
                    value={this.state.value}
                    placeholder={this.props.placeholder}
                    onChange={this.handleInputChange}/>
            </FormGroup>
        );
    }

}