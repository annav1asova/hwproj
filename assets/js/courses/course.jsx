let { Button,Grid,
    ButtonGroup,
    Table, } = ReactBootstrap;

const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Switch = ReactRouterDOM.Switch;

class PersonRow extends React.Component{
    render() {
        const tasks = this.props.person.tasks.map((task, index) => {
            return (<td>{task}</td>);
        });
        return (
            <tr>
                <td>{this.props.person.name}</td>
                <td>{this.props.person.todo}</td>
                {tasks}
            </tr>
        );
    }
}

class PersonTable extends React.Component{
    getTaskList(hw) {
        return hw.map((task, index) => {
            return (<th>{index + 1}</th>);
        });
    }
    render() {
        const hws = this.props.data.homeworks.map((homework, index) => {
            return (<th colSpan="2" width="auto">{index+1}</th>);
        });
        var tasks = [];
        this.props.data.homeworks.map((homework, index) => {
            tasks = tasks.concat(this.getTaskList(homework));
        });
        const people = this.props.data.table.map((person, index) => {
            return (<PersonRow person={person}/>);
        });
        return (
            <Table bordered>
                <thead>
                <tr>
                    <th>Student</th>
                    <th width="auto">ToDo</th>
                    {hws}
                </tr>
                <tr>
                    <th/>
                    <th>{this.props.data.todo}</th>
                    {tasks}
                </tr>
                </thead>
                <tbody>
                    {people}
                </tbody>
            </Table>
        );
    }
}
class Task extends React.Component{
    render() {
        const tasks = this.props.hw.map((task, index) => {
            return (<p>{index + ") " + task.name}</p>);
        });
        return (
            <div>
                <h3>Homework {this.props.id}</h3>
                {tasks}
            </div>
        );
    }
}

class BigCourse extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            idcourse: this.props.match.params.idcourse,
            idterm: this.props.match.params.idterm,
            coursename: "Awesome course",
            semesters: [
                {
                    todo:3,
                    table: [
                        {
                            name:"Anna Vlasova",
                            todo: 0,
                            tasks:[1,2,3,7]
                        },
                        {
                            name:"Natalia Ponomareva",
                            todo: 0,
                            tasks:[4,5,6,8]
                        }
                    ],
                    homeworks: [
                        [
                            {name: "Something"},
                            {name: "wow, cool"}
                        ],
                        [
                            {name: "YEee"},
                            {name: "Another"}
                        ]
                    ]
                },
                {
                    todo:4,
                    table: [
                        {
                            name:"Anna Vlasova",
                            todo: 0,
                            tasks:[1,2]
                        },
                        {
                            name:"Natalia Ponomareva",
                            todo: 0,
                            tasks:[4,5]
                        }
                    ],
                    homeworks: [[
                        {name: "Something2"},
                        {name: "wow, cool2"}
                    ]]
                }
            ],
            cursem: 0
        };
    }
    async componentDidMount() {
        /*let response = await axios.get('courses/' + this.state.idcourse, {
            withCredentials: true
        });
        this.setState({
            coursename: response.coursename,
            semesters: response.semesters,
        }); */
        //example
    }
    updateSem(event) {
        this.setState({ cursem: event.currentTarget.dataset.id });
    }
    render(){
        const semesters = this.state.semesters.map((sem, index) => {
            return (<Button data-id={index} onClick={this.updateSem.bind(this)}>{(index + 1) + ' semester'}</Button>);
        });

        const homeworks = this.state.semesters[this.state.cursem].homeworks.map((hw, index) => {
            return (<Task hw={hw} id={index}/>);
        });
        return (
            <Grid>
                <h1>{this.state.coursename}</h1>
                <ButtonGroup>
                    {semesters}
                </ButtonGroup>

                <PersonTable data={this.state.semesters[this.state.cursem]}/>

                <h3>Tasks</h3>
                {homeworks}
            </Grid>
        );
    }
}