let { Button,
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock} = ReactBootstrap;

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        axios.get('/sign/sign_in', {
            params: {
                'email': this.state.email,
                'pass': this.state.password
            }
        }).then(function (response) {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
        })
            .catch(function (error) {
                console.log(error);
            });
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup>
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
                <FormGroup>
                    <ControlLabel>
                        Password:
                    </ControlLabel>
                    <FormControl
                        name="password"
                        type="password"
                        value={this.state.password}
                        placeholder="Enter password"
                        onChange={this.handleInputChange}/>
                </FormGroup>
                <Button type="submit">Submit</Button>
            </form>
        );
    }
}