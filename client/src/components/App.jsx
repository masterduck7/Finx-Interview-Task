const axios = require('axios')
const React = require('react');
import './App.scss';

class App extends React.Component {
    constructor() {
        super()
        this.state = ({ categories: [], productsFiltered: [] })
    }

    getProductsByCategory = async (category) => {
        await axios.get('/products/category/' + category)
            .then(response => {
                console.log(response.data)
                this.setState({ productsFiltered: response.data })
            })
            .catch((error) => {
                console.log(error)
            })
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