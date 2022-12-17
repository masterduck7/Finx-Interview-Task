const React = require('react');

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


class Products extends React.Component {
    render() {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Category</TableCell>
                            <TableCell align="center">Rating</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Stock</TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default Products;