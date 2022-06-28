import history from "../../history";
import {
	mapLoginCreateRequest,
	mapLoginCreateData,
	mapSignUpCreateData,
	mapAuthCreateResponse
} from "../mappers/auth";

export const actionTypes = {
	SET_LOGIN: 'SET_LOGIN',
	SET_ACCESS_USER: 'SET_ACCESS_USER',
	SET_USER: 'SET_USER',
	SET_REQUIRED: 'SET_REQUIRED'
}

export const setRequiredAuth = (required) => async (dispatch) => {
	dispatch({
		type: actionTypes.SET_REQUIRED,
		payload: required
	})
}

export const setLogin = (login) => async (dispatch) => {
	dispatch({
		type: actionTypes.SET_LOGIN,
		payload: login
	})
}

export const login = (data) => async (dispatch, getState, api) => {
	try {
		const url = `Usuarios/Logar`
		const dto = mapLoginCreateRequest(data)
		const result = await api.post(url, dto)
		const mappedResult = mapLoginCreateData(result.data)

		if (mappedResult.success) {
			const {
				name,
				accessToken,
				cpf
			} = mappedResult

			dispatch(setAccessUser({
				name: name,
				cpf: cpf,
				accessToken: accessToken
			}))

			return mappedResult
		}

		return mappedResult

	} catch (e) {
		console.log(e)

		dispatch({
			type: actionTypes.SET_LOGIN,
			payload: {
				status: false,
				userData: null
			}
		})
	}
}

export const signUp = (form) => async (dispatch, getState, api) => {
	const result = {}
	try {
		const url = `Usuarios/Cadastrar`
		const dto = mapSignUpCreateData(form)
		const apiResponse = await api.post(url, dto)

		const response = mapAuthCreateResponse(apiResponse.data)

		if (response.success) {
			Object.assign(result, {
				success: true,
				user: response.user
			})

			dispatch(setUser(response.user))
		}
	} catch (e) {
		console.log(e)

		dispatch(setUser({}))
	}
}

export const logout = () => async (dispatch, getState) => {
	const URLParameters = getState().main.URLParameters || ''

	dispatch(setAccessUser(null))

	history.push(`/${URLParameters}`)
}

export const setAccessUser = (value) => ({
	type: actionTypes.SET_ACCESS_USER,
	payload: value
})

const setUser = (user) => async (dispatch, getState, api) => {
	await dispatch({
		type: actionTypes.SET_USER,
		payload: user
	})
}
