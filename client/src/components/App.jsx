const axios = require('axios')
const React = require('react');
import './App.scss';
import Products from './products/products.jsx';


class App extends React.Component {
    constructor() {
        super()
        this.state = ({ categories: [], productsFiltered: { "products": [] }, productData: {} })
    }

    getCategories = async () => {
        await axios.get('/categories')
            .then(response => {
                this.setState({ categories: response.data })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getAllProducts = async () => {
        await axios.get('/products')
            .then(response => {
                this.setState({ productsFiltered: response.data })
            })
            .catch((error) => {
                console.log(error)
            })
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
        await this.getAllProducts();
    }

    render() {
        return (
            <div>
                <h1 className='titleApp'>Finx React</h1>
                <Products productsFiltered={this.state.productsFiltered} />
            </div>
        )
    }
}

export default App;