let { Button,Grid,Row,Col,
    FormGroup,
    ControlLabel,
    FormControl,} = ReactBootstrap;

class Editing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confpassword: "",
            curpassword: "",
            fnValid: true,
            lnValid: true,
            emValid: true,
            passValid: true,
            confpassValid: true,
            formValid: true
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        let response = await axios.post('/profile', {
            withCredentials: true
        });
        this.setState({
            firstname: response.data.FirstName,
            lastname: response.data.Surname,
            email: response.data.Email,})
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value},
            () => {
                this.validateField(name, value)
            });
    }

    handleSubmit(event) {
        axios.post('/editprofile', {
            'firstName': this.state.firstname,
            'lastName': this.state.lastname,
            'email' : this.state.email,
            'pass' : this.state.password,
            'curpass' : this.state.curpassword
        }).then(function (response) {
            window.location = '/profile'
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
        let emValid = this.state.emValid;
        let passValid = this.state.passValid;
        let confpassValid = this.state.confpassValid;

        switch (fieldName) {
            case 'firstname':
                fnValid = value.length >= 2;
                break;
            case 'lastname':
                lnValid = value.length >= 2;
                break;
            case 'email':
                emValid = value.length >= 2;
                break;
            case 'password':
                passValid = value.length >= 2;
            case 'confpassword':
                confpassValid = this.state.password === this.state.confpassword;
                break;
            default:
                break;
        }
        this.setState({
            fnValid: fnValid,
            lnValid: lnValid,
            emValid: emValid,
            passValid: passValid,
            confpassValid: confpassValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.fnValid &&
            this.state.lnValid && this.state.emValid && this.state.passValid && this.state.confpassValid});
    }

    validState(state) {
        if (state === true)
            return 'success';
        return 'error';
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup
                    validationState={this.validState(this.state.fnValid)}
                >
                    <ControlLabel>
                        First name:
                    </ControlLabel>
                    <FormControl
                        name="firstname"
                        type="text"
                        value={this.state.firstname}
                        placeholder="Enter first name"
                        onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup
                    validationState={this.validState(this.state.lnValid)}
                >
                    <ControlLabel>
                        Last name:
                    </ControlLabel>
                    <FormControl
                        name="lastname"
                        type="text"
                        value={this.state.lastname}
                        placeholder="Enter last name"
                        onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup
                    validationState={this.validState(this.state.emValid)}
                >
                    <ControlLabel>
                        Email:
                    </ControlLabel>
                    <FormControl
                        name="email"
                        type="text"
                        value={this.state.email}
                        placeholder="Enter email"
                        onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup
                    validationState={this.validState(this.state.passValid)}
                >
                    <ControlLabel>
                        Password:
                    </ControlLabel>
                    <FormControl
                        name="password"
                        type="text"
                        value={this.state.password}
                        placeholder="Enter password"
                        onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup
                    validationState={this.validState(this.state.confpassValid)}
                >
                    <ControlLabel>
                        Confirmation:
                    </ControlLabel>
                    <FormControl
                        name="confpassword"
                        type="password"
                        value={this.state.confpassword}
                        placeholder="Enter confirmation of the password"
                        onChange={this.handleInputChange}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>
                        Current password:
                    </ControlLabel>
                    <FormControl
                        name="curpassword"
                        type="password"
                        value={this.state.curpassword}
                        placeholder="Enter current password"
                        onChange={this.handleInputChange}/>
                </FormGroup>
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
                        <h3>Edit your profile:</h3>
                        <Editing/>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('root'));