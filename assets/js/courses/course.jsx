let { Button,Grid,
    Row, Col, Tabs, Tab,
    ListGroupItem, ListGroup} = ReactBootstrap;

const Router = ReactRouterDOM.BrowserRouter;
const Route = ReactRouterDOM.Route;
const Switch = ReactRouterDOM.Switch;

class BigCourse extends React.Component{
    render(){
        // получаем параметры
        const id = this.props.match.params.idcourse;
        const name = this.props.match.params.idterm;
        return <h2>id: {id}  Name: {name}</h2>;
    }
}

window.BigCourse = BigCourse;