const React = require('react');
import ReactImageZoom from 'react-image-zoom';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Unstable_Grid2';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    height: '80vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};
const props = { width: 300, zoomPosition: 'original' };


class ProductDetail extends React.Component {
    render() {
        return (
            <Modal
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box style={{ overflow: 'auto' }} sx={style}>
                    <Grid container spacing={2}>
                        <Grid xs={3}>
                            <p><b>Title:</b> {this.props.product["title"]}</p>
                        </Grid>
                        <Grid xs={3}>
                            <p><b>Price:</b> {this.props.product["price"]} <b className='discount'>({this.props.product["discountPercentage"]} % OFF)</b></p>
                        </Grid>
                        <Grid xs={3}>
                            <p><b>Stock:</b> {this.props.product["stock"]}</p>
                        </Grid>
                        <Grid xs={3}>
                            <p><b>Rating:</b> {this.props.product["rating"]}</p>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid xs={6}>
                            <p><b>Description:</b> {this.props.product["description"]}</p>
                        </Grid>
                        <Grid xs={3}>
                            <p><b>Brand:</b> {this.props.product["brand"]}</p>
                        </Grid>
                        <Grid xs={3}>
                            <p><b>Category:</b> {this.props.product["category"]}</p>
                        </Grid>
                    </Grid>
                    <p><b>Images:</b> </p>
                    <ImageList sx={{ width: '80vw' }} cols={3}>
                        {this.props.product["images"].map((image, id) => (
                            <ReactImageZoom key={id} img={image} {...props} />
                        ))}
                    </ImageList>
                    <center>
                        <Button variant="contained" onClick={() => this.props.handleClose()}>Close</Button>
                    </center>
                </Box>
            </Modal>
        )
    }
}

export default ProductDetail;