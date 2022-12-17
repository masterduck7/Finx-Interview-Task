const axios = require('axios');
const React = require('react');
import ProductDetail from '../productDetail/productDetail.jsx';
import './products.scss';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


class Products extends React.Component {
    constructor() {
        super()
        this.state = ({
            categories: [],
            productsFiltered: { "products": [] },
            selectedCategory: 'All',
            selectedProduct: { "id": null, "name": null, "images": [] },
            modalDetails: false,
            numberPages: 1,
            currentPage: 0,
            pageSize: 10,
        })
    }

    handleCloseModal = () => {
        this.setState({ modalDetails: false });
    }

    handleOpenModal = (product) => {
        this.setState({ modalDetails: true, selectedProduct: product })
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

    getAllProducts = async (currentPage) => {
        const config = {
            headers: {
                skip: currentPage, pageSize: this.state.pageSize
            }
        }
        await axios.get('/products', config)
            .then(response => {
                this.setState({ productsFiltered: response.data, numberPages: (response.data["total"] / this.state.pageSize) })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getProductsByCategory = async (name, currentPage) => {
        const config = {
            headers: {
                skip: currentPage, pageSize: this.state.pageSize
            }
        }
        await axios.get('/products/category/' + name, config)
            .then(response => {
                this.setState({ productsFiltered: response.data, numberPages: Math.round(response.data["total"] / this.state.pageSize) })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    handleCategoryChange = (event) => {
        if (event.target.value != 'All') {
            this.setState({ selectedCategory: event.target.value, currentPage: 0 });
            this.getProductsByCategory(event.target.value, 0);
        } else {
            this.setState({ selectedCategory: 'All', currentPage: 0 });
            this.getAllProducts(0);
        }
    }

    handlePaginationChange = (event, value) => {
        if (this.state.selectedCategory == 'All') {
            this.setState({ currentPage: value - 1 });
            this.getAllProducts(value - 1);
        } else {
            this.setState({ currentPage: value - 1 });
            this.getProductsByCategory(this.state.selectedCategory, value - 1);
        }
    }

    componentDidMount = async () => {
        await this.getCategories();
        await this.getAllProducts(this.state.currentPage);
    }

    render() {
        return (
            <div>
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
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">Rating</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Stock</TableCell>
                                <TableCell align="center">Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.productsFiltered["products"].map((product) => (
                                <TableRow key={product["id"]}>
                                    <TableCell align="center">{product["title"]}</TableCell>
                                    <TableCell align="center">{product["category"]}</TableCell>
                                    <TableCell align="center">{product["rating"]}</TableCell>
                                    <TableCell align="center">{product["price"]}</TableCell>
                                    <TableCell align="center">{product["stock"]}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" onClick={
                                            () => this.handleOpenModal(product)
                                        }>
                                            Show details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination count={this.state.numberPages} page={this.state.currentPage + 1} onChange={this.handlePaginationChange} variant="outlined" shape="rounded" />

                <ProductDetail product={this.state.selectedProduct} open={this.state.modalDetails} handleClose={this.handleCloseModal} />
            </div>
        )
    }
}

export default Products;