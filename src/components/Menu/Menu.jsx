import { Container, Dialog, Grid, Paper } from '@mui/material'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { styled } from '@mui/material/styles';
import { CategorieName, Product, ProductName, WrapperModal, Img, H1, Description, WrapperImg, Header, Body, CustomButton, SessionTitle } from './styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	padding: theme.spacing(1),
	textAlign: 'center',
	minHeight: "12.875rem",
	maxHeight: "12.875rem",
	color: theme.palette.text.secondary,
	cursor: "pointer"
}));

const Accordion = styled((props) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	border: `2px solid ${theme.palette.divider}`,
	borderRadius: '8px',
	'&:not(:last-child)': {
		borderBottom: '',
	},
	'&:before': {
		display: 'none',
	},
	'&.selected': {
		border: `1px solid #ED8B26`,
	}
}));

const AccordionSummary = styled((props) => (
	<MuiAccordionSummary {...props} />
))(() => ({
	padding: 0,
	margin: 0,
	backgroundColor: '#efefef'
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: '1px solid rgba(0, 0, 0, .125)',
	backgroundColor: '#efefef'
}));

function Feed(props) {
	const { categories } = props;
	const [open, setOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	const handleClose = () => {
		setSelectedProduct(null)
		setOpen(false)
	}

	const handleDialogSelectProduct = (product) => {
		setSelectedProduct(product)
		setOpen(true)
	}

	return (
		<Container disableGutters component="main" sx={{ pt: 4, pb: 2, pl: 2, pr: 2 }}>
			<SessionTitle>Nosso Cardápio</SessionTitle>
			{categories && categories.map((categorie) => {
				return (
					<>
						<CategorieName>
							{categorie.name}
						</CategorieName>
						<Grid container rowSpacing={1} sx={{ pb: 4 }} columnSpacing={{ xs: 2, sm: 2, md: 4 }}>
							{categorie && categorie?.products.map((product) => {
								return (
									<>
										<Grid item xs={6} md={2}>
											<Item onClick={() => handleDialogSelectProduct(product)}>
												<Product>
													<img src={product.image} alt="Imagem produto" />
													<ProductName>{product.name}</ProductName>
												</Product>
											</Item>
										</Grid>
									</>
								)
							})}
						</Grid>
					</>
				)
			})}

			{selectedProduct &&
				<Dialog
					onClose={handleClose}
					open={open}
					PaperProps={{
						elevation: 0,
						style: {
							overflowY: 'unset',
							maxWidth: '20rem',
							minWidth: '20rem'
						}
					}}
				>
					<WrapperModal>
						<WrapperImg>
							<Img src={selectedProduct.image} alt="Imagem produto" />
						</WrapperImg>
						<H1>{selectedProduct.name}</H1>
						<Description>{selectedProduct.description}</Description>
						{selectedProduct.nutritionalTable && <Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon sx={{ color: '#949494' }} />}
								aria-controls={`panel1a-content-${selectedProduct.id}`}
								id={`panel1a-header-${selectedProduct.id}`}
							>
								<Header>Informações Nutricionais</Header>
							</AccordionSummary>
							<AccordionDetails>
								<Body
								>
									{selectedProduct.nutritionalTable}
								</Body>
							</AccordionDetails>
						</Accordion>}
						<CustomButton>
							Quero Agora!
						</CustomButton>
					</WrapperModal>
				</Dialog>}
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		categories: state.menu.categories || []
	};
}

export default connect(
	mapStateToProps, {
})(Feed);
