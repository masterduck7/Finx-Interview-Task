const axios = require('axios')
const React = require('react');
import './App.scss';

class App extends React.Component {
    constructor() {
        super()
        this.state = ({ categories: [], productsFiltered: [], productData: {} })
    }

    getProductsByCategory = async (name) => {
        await axios.get('/products/category/' + name)
            .then(response => {
                this.setState({ productsFiltered: response.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getProductById = async (id) => {
        await axios.get('/products/' + id)
            .then(response => {
                this.setState({ productData: response.data })
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