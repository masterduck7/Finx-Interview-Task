const axios = require('axios')
const React = require('react');
import './App.scss';
import Products from './products/products.jsx';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


class App extends React.Component {
    constructor() {
        super()
        this.state = ({
            categories: [],
            productsFiltered: { "products": [] },
            productData: {},
            selectedCategory: 'All'
        })
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

    handleCategoryChange = async (event) => {
        if (event.target.value != 'All') {
            this.setState({ selectedCategory: event.target.value });
            await this.getProductsByCategory(event.target.value);
        } else {
            this.setState({ selectedCategory: 'All' });
            await this.getAllProducts();
        }

    }

    componentDidMount = async () => {
        await this.getCategories();
        await this.getAllProducts();
    }

    render() {
        return (
            <div>
                <h1 className='titleApp'>Finx React</h1>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.selectedCategory}
                        label="Filter by category"
                        onChange={this.handleCategoryChange}
                    >
                        <MenuItem key={0} value={'All'}>All</MenuItem>
                        {this.state.categories.map((category, id) => (
                            <MenuItem key={id} value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Products productsFiltered={this.state.productsFiltered} />
            </div>
        )
    }
}

export default App;