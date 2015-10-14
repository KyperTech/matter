class HelloWorld extends React.Component {
    render() {
        return (<div>Hello, world</div>);
    }
}
let rootElement = document.getElementById('content');
ReactDOM.render(<HelloWorld />, rootElement);
