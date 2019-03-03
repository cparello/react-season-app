import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lat: null,
            errMsg: ''
        };
    }
    componentDidMount() {
        let $this = this;
        window.navigator.geolocation.getCurrentPosition(
            position => {
                $this.setState({lat: position.coords.latitude})
            },
            (err) => {
                $this.setState({errMsg: err.message})
            }
        );
    }

    renderContent(){
        if(this.state.errorMessage && !this.state.lat){
            return <SeasonDisplay err ={this.state.errMsg}></SeasonDisplay>
        }

        if(!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat ={this.state.lat}></SeasonDisplay>
        }
        return <Spinner message="Please accept the location request."/>;
    }

    render(){
        return(
            <div className="border red">
                {this.renderContent()}
            </div>
        )
    }


}


ReactDOM.render(
    <App/>,document.querySelector('#root')
);