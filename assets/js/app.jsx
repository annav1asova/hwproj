let { Button,
    ButtonGroup,
    Table,
    Grid } = ReactBootstrap;

var App = React.createClass({
    render() {
        return (
            <Grid>
                <h1>Some info about your course</h1>
                <ButtonGroup>
                    <Button>1 semester</Button>
                    <Button>2 semester</Button>
                    <Button>3 semester</Button>
                </ButtonGroup>
                <Table bordered>
                    <thead>
                    <tr>
                        <th>Student</th>
                        <th width="auto">ToDo </th>
                        <th colSpan="2" width="auto">#1</th>
                    </tr>
                    <tr>
                        <th/>
                        <th>3</th>
                        <th>1</th>
                        <th>2</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>0</td>
                        <td bgcolor="green"/>
                        <td bgcolor="green"/>
                    </tr>
                    <tr>
                        <td>Mary Moe</td>
                        <td>1</td>
                        <td bgcolor="yellow"/>
                        <td bgcolor="green"/>
                    </tr>
                    <tr>
                        <td>July Dooley</td>
                        <td>2</td>
                        <td/>
                        <td/>
                    </tr>
                    </tbody>
                </Table>

                <h1>Tasks</h1>
                <p>1. bla bla bla </p>
                <p>2. bla bla bla </p>

            </Grid>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('root'));