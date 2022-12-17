const React = require('react');

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    height: '80vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};


class Products extends React.Component {
    constructor() {
        super()
        this.state = ({
            selectedProduct: { "id": null, "name": null, "images": [] },
            modalDetails: false,
        })
    }

    handleCloseModal = () => {
        this.setState({ modalDetails: false });
    }

    handleOpenModal = (product) => {
        this.setState({ modalDetails: true, selectedProduct: product })
    }

    render() {
        return (
            <div>
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
                            {this.props.productsFiltered["products"].map((product) => (
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
                <Modal
                    open={this.state.modalDetails}
                    onClose={this.handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <p>Title: {this.state.selectedProduct["title"]}</p>
                        <p>Description: {this.state.selectedProduct["description"]}</p>
                        <p>Price: {this.state.selectedProduct["price"]}</p>
                        <p>Discount Percentage: {this.state.selectedProduct["discountPercentage"]}</p>
                        <p>Rating: {this.state.selectedProduct["rating"]}</p>
                        <p>Stock: {this.state.selectedProduct["stock"]}</p>
                        <p>Brand: {this.state.selectedProduct["brand"]}</p>
                        <p>Category: {this.state.selectedProduct["category"]}</p>
                        <p>Thumbnail: {this.state.selectedProduct["thumbnail"]}</p>
                        <p>Images: </p>
                        <ImageList cols={3} rowHeight={164}>
                            {this.state.selectedProduct["images"].map((image, id) => (
                                <ImageListItem key={id}>
                                    <img
                                        src={`${image}?w=164&h=164&fit=crop&auto=format`}
                                        srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        alt={id}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                        <center>
                            <Button variant="contained" onClick={() => this.handleCloseModal()}>Close</Button>
                        </center>
                    </Box>
                </Modal>
            </div>
        )
    }
}

export default Products;