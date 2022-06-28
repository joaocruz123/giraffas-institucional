import React, {
	useEffect,
	useState
} from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import history from '../../history'
import { ReactComponent as IconArrowLeft } from '../../assets/icons/icon_arrow_left.svg'
import { ReactComponent as IconClose } from '../../assets/icons/icon_close.svg'
import { InputRounded } from '../Common'

import {
	Wrapper,
	Header,
	Title,
	Form,
	FormFieldName,
	FormFieldLastName,
	FormFieldEmail,
	FormFieldBirthDate,
	FormFieldCPF,
	FormFieldPassword,
	FormFieldRepeatPassword,
	RegisterButton,
	TermsOfServiceLabel,
	PhoneHeader,
	ErrorMessage
} from './styles'

function SignUp(props) {
	const {
		setSignUp,
		setAccessToken,
		postSignUp,
		postSignUpFacebook,
		postSignUpGoogle,
		signUp,
		setCard,
		setUserCard,
		setLogin,
		getSignUp,
		setNotification,
		postCode,
		setUserHistory,
		postPhone,
		close,
		userHistory,
		URLParameters
	} = props

	/* const { name, lastName, email } = signUp */

	// const {
	//   back
	// } = userHistory

	const [loading, setLoading] = useState(false)
	const [loaded, setLoaded] = useState(false)
	const [ready, setReady] = useState(false)
	const [phoneReady, setPhoneReady] = useState(false)
	const [phoneStep, setPhoneStep] = useState(0)
	const [phoneHeaderTitle, setPhoneHeaderTitle] = useState('Cadastrar celular')
	const [time, setTime] = useState(30)
	const [signUpError, setSignUpError] = useState(null)
	const [values, setValues] = useState({ ...signUp })

	const {
		name,
		lastName,
		email,
		birthDate,
		CPF,
		password,
		password2,
		phone,
		code,
		ddi,
		country
	} = values

	let timeout = null

	function handleInput(event) {
		const {
			name,
			value
		} = event.target

		const newValue = {
			[name]: value
		}

		if (name === 'ddi') {
			const value = event.target.value.split('|')
			const country = value[0]
			const ddi = value[1]

			Object.assign(newValue, {
				country,
				ddi
			})
		}

		setValues({
			...values,
			...newValue
		})
	}

	function handleBirthDateKeyDown(event) {
		const { keyCode } = event

		if (!(
			(keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) ||
			keyCode === 8 ||
			keyCode === 9 ||
			keyCode === 46 ||
			keyCode === 37 ||
			keyCode === 39
		)) {
			event.preventDefault()
		}

		if (keyCode === 191 && birthDate && (birthDate.indexOf('/') > -1 || birthDate.length !== 5)) {
			event.preventDefault()
		}

		if (
			birthDate &&
			(birthDate.length === 2 || birthDate.length === 5) &&
			keyCode !== 8 && keyCode !== 9 && keyCode !== 37 && keyCode !== 39 && keyCode !== 46
		) {
			handleInput({
				...event,
				target: {
					...event.target,
					name: 'birthDate',
					value: `${birthDate}/`
				}
			})
		}
	}

	function handleCPFKeyDown(event) {
		const { keyCode } = event

		if (!(
			(keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) ||
			keyCode === 8 ||
			keyCode === 9 ||
			keyCode === 46
		)) {
			event.preventDefault()
		}

		if (CPF && (CPF.length === 3 || CPF.length === 7) && keyCode !== 8 && keyCode !== 46) {
			handleInput({
				...event,
				target: {
					...event.target,
					name: 'CPF',
					value: `${CPF}.`
				}
			})
		}

		if (CPF && (CPF.length === 11) && keyCode !== 8 && keyCode !== 46) {
			handleInput({
				...event,
				target: {
					...event.target,
					name: 'CPF',
					value: `${CPF}-`
				}
			})
		}
	}

	function handleStep(args) {
		const titles = {
			0: 'Cadastrar celular',
			1: 'Código de confirmação'
		}
		setPhoneHeaderTitle(titles[args])
		setPhoneStep(args)
	}

	async function handleSubmit() {
		setLoading(true)

		setSignUp({
			...signUp,
			...values,
			success: false
		})

		if (signUp.facebookUserId) {
			await postSignUpFacebook()
		} else if (signUp.googleUserId) {
			await postSignUpGoogle()
		} else {
			await postSignUp()
		}

		const newSignUp = getSignUp()

		if (newSignUp && newSignUp.success) {
			const token = newSignUp.token && newSignUp.token.accessToken

			setAccessToken(token)
			setPhoneReady(true)
			setLoading(false)
			setNotification(null)
			setSignUpError(null)

			return
		}

		const notificationMessage = 'Não foi possível fazer o cadastro!'
		setNotification({
			type: 'warning',
			message: notificationMessage
		})
		setSignUpError(notificationMessage)

		setLoading(false)
	}

	function postTime(args) {
		setTime(args)
	}

	function handleTime(startTime, time = 0, data = {}) {
		const signUp = getSignUp()

		if (!time && data) {
			setSignUp({
				...signUp,
				...data
			})
		}

		if (data.clear) {
			postTime(30, 30)
			clearTimeout(timeout)

			return
		}

		timeout = setTimeout(() => {
			postTime(Number(time - 1))

			if (time - 1 > 0) {
				handleTime(startTime, time - 1)
			}
		}, 1000)
	}

	async function handlePhoneSubmit() {
		setSignUp({
			...signUp,
			...values
		})

		await postPhone([() => {
			const notificationMessage = 'Não foi possível enviar o código para seu telefone celular.'

			setNotification({
				type: 'warning',
				message: notificationMessage
			})

			setSignUpError(notificationMessage)
			handleStep(0)
		}, () => {
			//const newConfirmationType = messageErrors + 1 >= 4 ? 'phone' : 'sms'

			// handleTime(30, 30, {
			// 	messageErrors: messageErrors + 1,
			// 	confirmationType: newConfirmationType,
			// 	resend: true,
			// 	clear: false
			// })
			setNotification(null)
			setSignUpError(null)
			handleStep(1)
		}])
	}

	async function handleCodeSubmit() {
		setSignUp({
			...signUp,
			...values
		})

		await postCode([{
			name: 'address',
			type: 'error',
			callback: (a) => {
				// setUserHistory({
				//   next: 'sign-up',
				//   back: 'sign-up'
				// })

				const notificationMessage = 'Não foi possível cadastrar seu endereço. Tente novamente.'
				setNotification({
					type: 'warning',
					message: notificationMessage
				})

				history.push(`/new-address${URLParameters}`)
			}
		}, {
			name: 'address',
			type: 'success',
			callback: (b) => {

				console.warn('Address created')
			}
		}, {
			name: 'code',
			type: 'error',
			callback: () => {
				const notificationMessage = 'Não foi possível validar o código para seu telefone celular.'
				setNotification({
					type: 'warning',
					message: notificationMessage
				})
				setSignUpError(notificationMessage)

				setPhoneReady(true)
			}
		}, {
			name: 'code',
			type: 'success',
			callback: () => {
				const signUp = getSignUp()

				const token = signUp.token && signUp.token.accessToken

				const {
					email,
					password
				} = signUp

				setCard(null)
				setUserCard(null)
				setAccessToken(token)
				setLogin({
					...signUp,
					email,
					password,
					success: true,
					subscriptionStatus: 1
				})
				setPhoneReady(false)
				setNotification(null)
				setSignUpError(null)
				setSignUp(null)

				if (close && typeof close === 'function') {
					close()
				}

				// const {
				// 	back
				// } = userHistory

				// if (back && back !== '/') {
				// 	history.push(`/${back}${URLParameters}`)
				// } else {
				// 	history.push(`/${URLParameters}`)
				// }
			}
		}])
	}

	return (
		<Wrapper>
			{!phoneReady &&
				<>
					{signUpError &&
						<ErrorMessage>
							<span>{signUpError}</span>
							<IconClose />
						</ErrorMessage>
					}
					<Header>
						<IconArrowLeft onClick={() => {
							// if (back && back !== '/' && back !== 'sign-up') {
							//   history.push(`/${back}${URLParameters}`)
							// } else {
							// 	window.history.back()
							// }
						}} />
						<Title>Cadastrar nova conta</Title>
					</Header>
					<Form onSubmit={(event) => { event.preventDefault() }}>
						<FormFieldName>
							<InputRounded
								placeholder="Nome"
								name='name'
								value={name}
								onChange={handleInput}
							/>
						</FormFieldName>
						<FormFieldLastName>
							<InputRounded
								placeholder="Sobrenome"
								name='lastName'
								value={lastName}
								onChange={handleInput}
							/>
						</FormFieldLastName>
						<FormFieldEmail>
							<InputRounded
								placeholder="E-mail"
								name='email'
								value={email}
								onChange={handleInput}
							/>
						</FormFieldEmail>
						<FormFieldBirthDate>
							<InputRounded
								placeholder="Data de nascimento"
								maxLength={10}
								name='birthDate'
								value={birthDate}
								onChange={handleInput}
								onKeyDown={handleBirthDateKeyDown}
							/>
						</FormFieldBirthDate>
						<FormFieldCPF>
							<InputRounded
								placeholder="CPF"
								className='half'
								maxLength={14}
								name='CPF'
								value={CPF}
								onKeyDown={handleCPFKeyDown}
								onChange={handleInput}
							/>
						</FormFieldCPF>
						<FormFieldPassword>
							<InputRounded
								placeholder="Senha"
								type='password'
								name='password'
								value={password}
								onChange={handleInput}
							/>
						</FormFieldPassword>
						<FormFieldRepeatPassword>
							<InputRounded
								placeholder="Confirmar senha"
								type='password'
								name='password2'
								value={password2}
								onChange={handleInput}
							/>
						</FormFieldRepeatPassword>
						<RegisterButton
							onClick={() => { handleSubmit() }}
						>
							Cadastrar
						</RegisterButton>
						<TermsOfServiceLabel>
							Ao se cadastrar você concorda com os <a href='#a'>Termos de Uso</a>
						</TermsOfServiceLabel>
					</Form>
				</>
			}
		</Wrapper>
	)
}

const mapStateToProps = (state) => {
	return {
		// signUp: (state.signUp.signUp) || {},
		// userHistory: (state.main.userHistory) || {},
		// URLParameters: (state.main.URLParameters) || ''
	}
}

export default connect(
	mapStateToProps, {

})(SignUp);
