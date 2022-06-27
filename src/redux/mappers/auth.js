import moment from "moment"

export const mapLoginCreateRequest = (data) => {
	const {
		email,
		password
	} = data

	return {
		"Email": email,
		"Senha": password
	}
}

export const mapLoginCreateData = (data) => {
	return {
		id: data['UsuarioId'],
		name: data['Nome'],
		success: data['Sucesso'],
		subscriptionStatus: data['StatusCadastro'],
		lastName: data['Sobrenome'],
		email: data['Email'],
		cpf: data['Cpf'],
		phone: data['Telefone'],
		birthDay: data['DataNascimento'],
		loginType: data['TipoLogin'],
		accessToken: data['Token'] && data['Token']['AccessToken'],
		message: data['Mensagem']
	}
}

export const mapSignUpCreateData = (data) => {
	return {
		'Nome': data.name,
		'SobreNome': data.lastName,
		'Email': data.email,
		'Senha': data.password,
		'ConfirmaSenha': data.password2,
		'DataNascimento': data.birthDate,
		'Cpf': data.CPF,
		'Telefone': data.phone,
	}
}


export const mapAuthCreateResponse = (response) => {
	const expiresSeconds = response["Token"] && response["Token"]["ExpiresIn"];
	return {
			user: {
					id: response["UsuarioId"],
					authToken: response["AuthenticationToken"],
					name: response["Nome"],
					lastname: response["SobreNome"],
					email: response["Email"],
					cpf: response["Cpf"],
					phone: response["Telefone"],
					birthdate: response["DataNascimento"],
					mustUpdate: response["AtualizacaoObrigatoria"],
					hasUpdate: response["TemAtualizacao"],
					signUpStatus: response["StatusCadastro"],
					signUp: response["Cadastrar"],
					updateData: response["AtualizarDados"],
					loginType: response["TipoLogin"],
					token: {
							accessToken: response["Token"] && response["Token"]["AccessToken"],
							type: response["Token"] && response["Token"]["TokenType"],
							expires: moment().add("seconds", expiresSeconds).toISOString(),
					}
			},
			success: response["Sucesso"],
			message: response["Mensagem"],
	}
}

export const mapForgotPasswordFormToAPI = (email) => {
	return {
			"Email": email
	}
}
