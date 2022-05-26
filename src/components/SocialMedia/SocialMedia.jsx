import React from 'react'
import {
	Background,
	SubTitle,
	Title,
	Session
} from './styles'
import { connect } from 'react-redux'
import { Avatar, Container, Grid, Stack } from '@mui/material'
import Grade1 from './../../assets/grade1.png'
import Grade2 from './../../assets/grade2.png'
import Social1 from './../../assets/social1.png'
import Social2 from './../../assets/social2.png'
import Social3 from './../../assets/social3.png'
import facebook from './../../assets/social/face.png'
import instagram from './../../assets/social/insta.png'
import youtube from './../../assets/social/youtube.png'
import linkedin from './../../assets/social/linkedin.png'

function SocialMedia(props) {
	return (
		<>
			<Grid container spacing={1}>
				<Grid item xs={12} md={3}>
					<Background className='left'>
						<img src={Grade1} width="300" alt="background-rede-social" />
					</Background>
				</Grid>
				<Grid item xs={12} md={6}>
					<Session>
						<Title>Siga nossas Redes Sociais</Title>
						<SubTitle>E não perca nenhuma novidade!</SubTitle>
					</Session>
				</Grid>
				<Grid item xs={12} md={3}>
					<Background className='right'>
						<img src={Grade2} width="300" alt="background-rede-social" />
					</Background>
				</Grid>
			</Grid>
			<Grid container spacing={5} md={{ pl: 10, pr: 10 }} sx={{ pl: 3, pr: 3 }}>
				<Grid item xs={12} md={4}>
					<a href='https://www.instagram.com/p/CdyHEw9j0zG/' target="_blank" rel="noreferrer">
						<img src={Social1} width="100%" alt="media-rede-social" />
					</a>
				</Grid>
				<Grid item xs={12} md={4}>
					<a href='https://www.instagram.com/p/Cdvd3j6jvoK/' target="_blank" rel="noreferrer">
						<img src={Social2} width="100%" alt="media-rede-social" />
					</a>
				</Grid>
				<Grid item xs={12} md={4}>
					<a href='https://www.instagram.com/p/CdeIKZUJ4tF/' target="_blank" rel="noreferrer">
						<img src={Social3} width="100%" alt="media-rede-social" />
					</a>
				</Grid>
			</Grid>
			<Container disableGutters component="main" sx={{ pt: 4, pb: 4 }}>
				<Stack direction="row" justifyContent="center" alignItems="center" spacing={-2}>
					<a href='https://www.facebook.com/redegiraffas' target="_blank" rel="noreferrer">
						<Avatar alt="Facebook" src={facebook} sx={{ width: 80, height: 80 }} />
					</a>
					<a href='https://www.instagram.com/redegiraffas' target="_blank" rel="noreferrer">
						<Avatar alt="Instagram" src={instagram} sx={{ width: 80, height: 80 }} />
					</a>
					<a href='https://www.youtube.com/channel/UCKWWKktqqDirIHEhNdRfp3A' target="_blank" rel="noreferrer">
						<Avatar alt="Youtube" src={youtube} sx={{ width: 80, height: 80 }} />
					</a>
					<a href='https://www.linkedin.com/company/giraffas/?originalSubdomain=br' target="_blank" rel="noreferrer">
						<Avatar alt="Linkedin" src={linkedin} sx={{ width: 80, height: 80 }} />
					</a>
				</Stack>
			</Container>
		</>
	)
}
const mapStateToProps = (state) => {
	return {
		groups: state.ui.groups
	};
}

export default connect(
	mapStateToProps, {
})(SocialMedia);
