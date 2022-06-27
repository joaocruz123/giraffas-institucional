import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'

import { pipe, GetContent } from '../../../domain/helpers'

import { ReactComponent as IconClose } from '../../assets/icons/icon_close.svg'
import { ReactComponent as IconCheck } from '../../assets/icons/icon_check.svg'

import { InputRounded, Button } from '../../components'

import {
	setNotification,
	postSendNewPassword
} from '../../../redux/actions/main'

import {
	Wrapper,
	ErrorMessage,
	SuccessMessage,
	Form,
	Title,
	ActionsWrapper,
	FormField
} from './styles'

export const useForgotPasswordDialogStyles = makeStyles((theme) => ({
	scrollPaper: {
		[theme.breakpoints.down(460)]: {
			alignItems: 'flex-end',
		}
	},
	paper: {
		borderRadius: '.75rem',
		[theme.breakpoints.down(460)]: {
			borderRadius: '.75rem .75rem 0 0',
			margin: 0,
			width: '100%',
			maxWidth: 'none',
		}
	}
}))
const Context = React.createContext({})

function ForgotPasswordPage(props) {
	const {
		postSendNewPassword,
		backStep
	} = props

	const [email, setEmail] = useState(null)
	const [pending, setPending] = useState(false)
	const [success, setSuccess] = useState(false)
	const [isValid, setIsValid] = useState(false)
	const [errorMessage, setErrorMessage] = useState(null)

	const handleSubmit = async () => {
		setPending(true)
		const result = await postSendNewPassword(email)

		if (result && result.success) {
			setErrorMessage(null)
			setSuccess(true)
		} else {
			setErrorMessage(result.message)
		}

		setPending(false)
	}
	
	const handleEmailChange = (value) => {
		setEmail(value)
		validateEmail(value)
	}

	const validateEmail = (email) => {
		const emailRegex = /\S+@\S+\.\S+/
		setIsValid(emailRegex.test(email))
	}

	return (
		<Wrapper>
			{ errorMessage && 
				<ErrorMessage>
					<span>{ errorMessage }</span>
					<IconClose />
				</ErrorMessage>
			}

			{ success && 
				<SuccessMessage>
					<span>Nova senha enviada para seu e-mail!</span>
					<IconCheck />
				</SuccessMessage>
			}
			<Form onSubmit={(event) => {
				event.preventDefault()
			}}>
				<Title>Esqueci minha senha</Title>
				<FormField>
					<InputRounded
						value={email}
						onChange={e => handleEmailChange(e.target.value)}
						type="text"
						name="email"
						placeholder="Insira o email cadastrado"
					/>
				</FormField>
				<ActionsWrapper>
					<Button
						onClick={() => { backStep() }}
						type='button'
					>
						Voltar
					</Button>
					<Button 
						onClick={() => { handleSubmit() }}
						disabled={pending || !isValid}
					>
						Enviar nova senha	
					</Button>
				</ActionsWrapper>
			</Form>
		</Wrapper>
	)
}

ForgotPasswordPage.propTypes = {
	postSendNewPassword: PropTypes.func,
	backStep: PropTypes.number
}

const mapStateToProps = () => { return {} }

const GetConnection = connect(mapStateToProps, {
	postSendNewPassword,
	setNotification
})

export const ForgotPassword = React.memo(pipe(
	GetConnection,
	GetContent({ context: Context, id: 'forgotPassword' })
)(ForgotPasswordPage))
