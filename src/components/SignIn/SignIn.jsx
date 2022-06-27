import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { ReactComponent as IconClose } from './../../assets/icons/icon_close_signin.svg'
import Logo from './../../assets/logo_giraffas.png'

import {
	login,
} from '../../redux/actions/auth'

import history from '../../history'

import {
	CustomLoading,
	InputRounded
} from './../Common'

import {
	Wrapper,
	Form,
	FormField,
	StoreLogoImage,
	SubmitButton,
	SingUpButton,
	TermsOfServiceLabel,
	ForgotPasswordLink,
	ErrorMessage
} from './styles'

import { useDeviceLayout } from '../utilities/useCustomLayout'
import { Dialog, Slide } from '@mui/material'
import { useSnackbar } from 'react-simple-snackbar'
import { ErrorOptions, SuccessOptions } from '../../utils/styleNotification'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

function SignIn(props) {
	const {
		setVisibleSignIn,
		login,
		setVisibleSignUp,
		setVisibleForgotPassword,
	} = props

	const storeLogo = Logo

	const isMobile = useDeviceLayout({
		isMobile: true
	})

	const [email, setEmail] = useState(null)
	const [password, setPassword] = useState(null)
	const [message, setMessage] = useState(null)
	const [signInError, setSignInError] = useState(null)
	const [loginForgotPassword, setLoginForgotPassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const [openSuccessSnackbar] = useSnackbar(SuccessOptions({ modal: false }))
	const [openErrorSnackbar] = useSnackbar(ErrorOptions({ modal: true }))

	useEffect(() => {
		setEmail('')
		setPassword('')

		return () => ({})
	}, [])

	const SubmitLogin = async () => {
		setLoading(true)

		if (email && password) {
			const result = await login({ email, password })

			if (result.success && result.accessToken && result.subscriptionStatus === 2) {
				setVisibleSignIn(false)
				setMessage(null)
				setLoading(false)
				return
			} else if (!result.success && result.message && result.subscriptionStatus !== 2) {
				setMessage(result.message)
				openErrorSnackbar(result.message, 50000)
				setLoading(false)
				return
			} else {
				openErrorSnackbar('Falha ao tentar fazer o login. Tente novamente!')
				setLoading(false)
			}
		}else{
			openErrorSnackbar('Preenchar o campo de email e senha!')
			setLoading(false)
		}
	}

	const handleCloseDialogForgotPassword = () => {
		setLoginForgotPassword(false)
	}

	return <Wrapper>
		<StoreLogoImage src={storeLogo} />
		<Form onSubmit={(event) => {
			event.preventDefault()
		}}>
			<FormField>
				<InputRounded
					value={email || ''}
					onChange={e => setEmail(e.target.value)}
					type="text"
					name="email"
					placeholder="Usuário"
				/>
			</FormField>
			<FormField>
				<InputRounded
					value={password || ''}
					onChange={e => setPassword(e.target.value)}
					type="password"
					name="pass"
					placeholder="Senha" />
			</FormField>
			<ForgotPasswordLink onClick={() => {
				setVisibleForgotPassword ? setVisibleForgotPassword() : setLoginForgotPassword(true)
			}}>Esqueci minha senha</ForgotPasswordLink>
			<SubmitButton onClick={() => {
				SubmitLogin()
			}}>
				{loading ?
					<CustomLoading
						color={'#fff'}
						type={'spin'}
						id='default-loading'
						height={30}
						width={30} /> :
					'Entrar'}
			</SubmitButton>
			<SingUpButton onClick={() => {
				if (setVisibleSignUp && typeof setVisibleSignUp === 'function') {
					setVisibleSignUp(true)
				} else {
					history.push(`/sign-up`)
				}
			}}>Ainda não tenho conta</SingUpButton>
			<TermsOfServiceLabel>
				Ao se cadastrar você concorda com os <br /><a href='#a'>Termos de Uso</a>
			</TermsOfServiceLabel>
		</Form>
	</Wrapper>
}

SignIn.propTypes = {}

const mapStateToProps = (state) => {
	return {}
}

export default connect(
	mapStateToProps, {
	login
})(SignIn);
