let { Button, Grid, Row, Col, FormGroup,
    ControlLabel,
    FormControl,
    Radio,
    Pager} = ReactBootstrap;

class ChooseTask extends React.Component {
    constructor(props) {
        super(props);
        let dataser;
        axios.get('/load', {
            withCredentials: true
        }).then(function (response) {
           dataser = response.data;
        }).catch(function (error) {
                console.log(error);
            });
        this.handleChange = this.handleChange.bind(this);
        //example
        dataser = ["1.2", "2.3", "5.6"];
        this.state = {
            data : dataser
        }
    }

    handleChange(e) {
        this.props.updateData(e.target.value);
    }

    render () {
        const tasks = this.state.data.map((name, index) => {
            return (<option value={name}>{name}</option>);
        });
        return (
        <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select task:</ControlLabel>
            <FormControl componentClass="select" onChange={this.handleChange} defaultValue={this.props.task}>
                {tasks}
            </FormControl>
        </FormGroup>
        )
    }
}

class ChooseMethod extends React.Component {
    constructor(props) {
        super(props);
        this.state = {option: this.props.method};
    }

    handleRadioChange(event) {
        this.setState({option: (event.target.value === 'option1')});
        this.props.updateData(this.state.option);
    }

    render() {
        return <div>
            <div class="radio">
                <label>
                    <input
                        name="lang"
                        type="radio"
                        value="option1"
                        checked={this.state.option}
                        onChange={this.handleRadioChange.bind(this)}/>Pull request on Github
                </label>
            </div>
            <div class="radio">
                <label>
                    <input
                        name="lang"
                        type="radio"
                        value="option2"
                        checked={!this.state.option}
                        onChange={this.handleRadioChange.bind(this)}/>File
                </label>
            </div>
        </div>;
    }
}

class LoadFile extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.updateData(e.target.files[0]);
    }
    render () {
        return (
            <form action='.' encType="multipart/form-data">
                <input type='file' onChange={this.handleChange}/>
            </form>
        )
    }
}

class LoadLink extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.updateData(e.target.value);
    }

    render() {
        return (
            <form>
                <FormGroup>
                    <ControlLabel>Input link to pull request on GitHub, please:</ControlLabel>
                    <FormControl
                        type="text"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                </FormGroup>
            </form>
        );
    }
}

class Success extends React.Component {
    render () {
        return (
            <h3>Your solution was successfully sent!</h3>
        )
    }
}

class LoadSolution extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step : 1,
            task : "",
            method : true,
            link : '',
            file : []
        }
    }

    updateTask(value) {
        this.setState({task: value});
    }
    updateMethod(value) {
        this.setState({method: value});
    }
    updateLink(value) {
        this.setState({link: value});
    }
    updateFile(value) {
        this.setState({file: value});
    }
    getCurStep() {
        switch (this.state.step) {
            case 1:
                return <ChooseTask updateData={this.updateTask.bind(this)} task={this.state.task}/>
            case 2:
                return <ChooseMethod updateData={this.updateMethod.bind(this)} method={this.state.method}/>
            case 3:
                return (this.state.method ?
                    <LoadLink updateData={this.updateLink.bind(this)}/>
                    : <LoadFile updateData={this.updateFile.bind(this)}/>)
            case 4:
                axios.post('/load', {
                    'task': this.state.task,
                    'method': this.state.method,
                    'link' : this.state.link,
                    'file' : this.state.file,
                    withCredentials: true
                }).then(function (response) {
                    console.log(response);
                })
                    .catch(function (error) {
                        console.log(error);
                    });
                return <Success/>
        }
    }

    render () {
        const pager = this.state.step < 4 ? ( <Pager>
                            <Pager.Item onClick={e => {this.setState({step: this.state.step - 1});}} disabled={this.state.step === 1}>Previous</Pager.Item>
                            <Pager.Item onClick={e => {this.setState({step: this.state.step + 1});}}>Next</Pager.Item>
                        </Pager>) : (<h3/>);

        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={6} xsOffset={3}>
                        {this.getCurStep()}
                        {pager}
                    </Col>
                </Row>
            </Grid>
        )
    }
}

ReactDOM.render(<LoadSolution />, document.getElementById('root'));