import React, {Component} from 'react';
import './App.css';
import Movies from './components/movies' ; // importing Movie Components


class App extends Component {
    render() {
        return (
            <main className="container">
                <Movies/> {/*Using Movie Component*/}
            </main>
        );
    }
}

export default App;
