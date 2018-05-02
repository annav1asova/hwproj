let { Button,
    FormGroup,
    ControlLabel,
    FormControl,
    Grid,} = ReactBootstrap;

class Task extends React.Component {
    render() {
        return (
            <form>
                <FormGroup>
                    <ControlLabel>Task:</ControlLabel>
                    <FormControl
                        name="task"
                        type="text"
                        value={this.props.data}
                        placeholder="Enter name"
                        onChange={this.props.onChangeTask}/>
                </FormGroup>
                <Button onClick={this.props.onDeleteTask}/>
            </form>
        )
    }
}

class Link extends React.Component {
    render() {
        return (
            <form>
                <FormGroup>
                    <ControlLabel>Name:</ControlLabel>
                    <FormControl
                        name="name"
                        type="text"
                        value={this.props.data.name}
                        placeholder="Enter name"
                        onChange={this.props.onChangeName}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Link:</ControlLabel>
                    <FormControl
                        name="link"
                        type="text"
                        value={this.props.data.link}
                        placeholder="Enter link"
                        onChange={this.props.onChangeLink}/>
                </FormGroup>
                <Button onClick={this.props.onDeleteLink}/>
            </form>
        )
    }
}

class HW extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            links: [{name:'',link:''}],
            tasks: ['']
        };
        this.addLink = this.addLink.bind(this);
        this.addTask = this.addTask.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeLink = this.onChangeLink.bind(this);
        this.onChangeTask = this.onChangeTask.bind(this);
        this.onDeleteLink = this.onDeleteLink.bind(this);
        this.onDeleteTask = this.onDeleteTask.bind(this);
    }
    addLink() {
        this.setState({links: this.state.links.concat({name:'', link:''})});
    }
    addTask() {
        this.setState({tasks: this.state.tasks.concat('')});
    }
    onChangeName(i, event) {
        var newlinks = this.state.links;
        newlinks[i].name = event.target.value;
        this.setState({links: newlinks});
    }
    onChangeLink(i, event) {
        var newlinks = this.state.links;
        newlinks[i].link = event.target.value;
        this.setState({links: newlinks});
    }
    onChangeTask(i, event) {
        var newtasks = this.state.tasks;
        newtasks[i] = event.target.value;
        this.setState({tasks: newtasks});
    }
    onDeleteLink(i, event) {
        var newlinks = this.state.links;
        newlinks.splice(i, 1);
        this.setState({links: newlinks});
    }
    onDeleteTask(i, event) {
        var newtasks = this.state.tasks;
        newtasks.splice(i, 1);
        this.setState({tasks: newtasks});
    }
    render() {
        var cur = this;
        const links = this.state.links.map(function(item, index) {
            return (
                <div key={index}>
                    <Link data={item} onChangeName={(e) => {cur.onChangeName(index, e)}}
                                     onChangeLink={(e) => {cur.onChangeLink(index, e)}}
                                     onDeleteLink={(e) => {cur.onDeleteLink(index, e)}}/>
                </div>
            )
        });
        const tasks = this.state.tasks.map(function(item, index) {
            return (
                <div key={index}>
                    <Task data={item} onChangeTask={(e) => {cur.onChangeTask(index, e)}}
                                    onDeleteTask={(e) => {cur.onDeleteTask(index, e)}}/>
                </div>
            )
        });
        return (
            <Grid>
                <div>
                    {links}
                </div>
                <Button onClick={this.addLink}>Add link</Button>
                <div>
                    {tasks}
                </div>
                <Button onClick={this.addTask}>Add task</Button>
            </Grid>
        );
    }
}

var App = <HW/>

ReactDOM.render(App,document.getElementById('root'));