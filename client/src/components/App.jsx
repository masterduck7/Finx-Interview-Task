const axios = require('axios')
const React = require('react');
import './App.scss';

class App extends React.Component {
    constructor() {
        super()
        this.state = ({ categories: [] })
    }

    componentDidMount = async () => {
        await axios.get('/categories')
            .then(response => {
                this.setState({ categories: response.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <h1 className='titleApp'>Finx React</h1>
        )
    }
}

export default App;