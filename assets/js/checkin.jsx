let { Button, Grid,
    Row, Col,
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock} = ReactBootstrap;

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2,
            firstname: "",
            lastname: "",
            fnValid: false,
            lnValid: false,
            formValid: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    }
    handleSubmit(event) {
        var bodyFormData = new FormData();
        bodyFormData.set('firstName', this.state.firstname);
        bodyFormData.set('lastName', this.state.lastname);
        axios({
            method: 'post',
            url: '/login',
            data: bodyFormData
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
        alert('First name: ' + this.state.firstname + '; Last name: ' + this.state.lastname);
        event.preventDefault();
    }

    validateField(fieldName, value) {
        let fnValid = this.state.fnValid;
        let lnValid = this.state.lnValid;

        switch(fieldName) {
            case 'firstname':
                fnValid = value.length >= 6;
                break;
            case 'lastname':
                lnValid = value.length >= 6;
                break;
            default:
                break;
        }
        this.setState({fnValid: fnValid,
            lnValid: lnValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.fnValid && this.state.lnValid});
    }

    validState(field) {
        let state = false;
        switch(field) {
            case "firstname":
                state = this.state.fnValid;
                break;
            case "lastname":
                state = this.state.lnValid;
                break;
            default:
                state = null;
                break;
        }
        if (state === true) return 'success';
        else return 'error';
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup
                    validationState={this.validState("firstname")}
                >
                    <ControlLabel>
                        First name:
                    </ControlLabel>
                    <FormControl
                        name="firstname"
                        type="text"
                        value={this.state.firstname}
                        placeholder="Enter first name"
                        onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup
                    validationState={this.validState("lastname")}
                >
                    <ControlLabel>
                        Last name:
                    </ControlLabel>
                    <FormControl
                        name="lastname"
                        type="text"
                        value={this.state.lastname}
                        placeholder="Enter last name"
                        onChange={this.handleInputChange} />
                </FormGroup>
                <HelpBlock>Please, enter at least 6 symbols.</HelpBlock>
                <Button type="submit" disabled={!this.state.formValid}>Submit</Button>
            </form>
        );
    }
}
var App = React.createClass({
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={6} xsOffset={3}>
                        <Auth/>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('root'));