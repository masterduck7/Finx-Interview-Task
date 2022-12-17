const React = require('react');
import './App.scss';
import Products from './products/products.jsx';


class App extends React.Component {
    render() {
        return (
            <div>
                <h1 className='titleApp'>Finx React</h1>
                <Products />
            </div>
        )
    }
}

export default App;