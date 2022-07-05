import history from "../../history";
import {
	mapLoginCreateRequest,
	mapLoginCreateData,
	mapSignUpCreateData,
	mapAuthCreateResponse,
	mapFbLoginFormToAPI,
	mapGoogleLoginFormToAPI,
	mapAuthAPIResponse
} from "../mappers/auth";

export const actionTypes = {
	SET_LOGIN: 'SET_LOGIN',
	SET_ACCESS_USER: 'SET_ACCESS_USER',
	SET_USER: 'SET_USER',
	SET_REQUIRED: 'SET_REQUIRED',
	SET_SIGN_UP: 'SET_SIGN_UP',
	SET_METHOD_LOGIN: 'SET_METHOD_LOGIN'
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

export const signUpUser = (form) => async (dispatch, getState, api) => {
	try {
		const url = `Usuarios/Cadastrar`
		const dto = mapSignUpCreateData(form)
		const apiResponse = await api.post(url, dto)

		const result = mapAuthCreateResponse(apiResponse.data)

		if (result.success) {
			const {
				name,
				token,
				cpf
			} = result.user

			console.log({
				name: name,
				cpf: cpf,
				accessToken: token && token.accessToken
			})
			dispatch(setAccessUser({
				name: name,
				cpf: cpf,
				accessToken: token && token.accessToken
			}))

			return result
		}

		return result
	} catch (e) {
		console.log(e)

		dispatch(setUser({}))
	}
}

export const setSignUp = (signUp) => async (dispatch) => {
	dispatch({
		type: actionTypes.SET_SIGN_UP,
		payload: signUp
	})
}

export const getSignUp = () => (dispatch, getState) => {
  const signUp = getState().auth.signUp

  return signUp
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

export const postSendNewPassword = (email) => async (dispatch, getState, api) => {
  try {
    const url = `Usuarios/RecuperarSenha`
    const response = await api.post(url, { Email: email })
    let result = {}

    if (response && response.data) {
      result = {
        ...result,
        success: response.data['Sucesso'],
        message: response.data['Mensagem']
      }
    }

    return result
  } catch (e) {
    const message = 'Não foi possível enviar a nova senha.'
    return { success: false, message }
  }
}

export const setMethodAccess = (method) => async (dispatch, getState, api) => {
  dispatch({
    type: actionTypes.SET_METHOD_LOGIN,
    payload: method
  })
}

export const postFacebookLogin = (form) => async (dispatch, getState, api) => {
  try {
    const url = `Usuarios/LogarViaFacebook`
    const data = mapFbLoginFormToAPI(form)
    const result = await api.post(url, data)
    const mappedResult = mapAuthAPIResponse(result.data)

    if (mappedResult.success && mappedResult.user && mappedResult.user.signUp) {
      dispatch(setLogin({
        ...mappedResult,
        email: form.email,
        password: null,
        success: true
      }))

      return mappedResult
    }

    if (mappedResult.success && mappedResult.user && !mappedResult.user.signUp) {

      dispatch(setLogin({
        ...mappedResult,
        ...form,
        email: form.email,
        password: null,
        success: true
      }))

      return mappedResult
    }

    // dispatch(setNotification({
    //   type: 'warning',
    //   message: 'Não foi possível fazer login com o Facebook.'
    // }))

    return mappedResult
  } catch (e) {
    console.log(e)
  }
}

export const postGoogleLogin = (form) => async (dispatch, getState, api) => {
  try {
    const url = `Usuarios/LogarViaGoogle`
    const data = mapGoogleLoginFormToAPI(form)
    const result = await api.post(url, data)
    const mappedResult = mapAuthAPIResponse(result.data)

    if (mappedResult.success && mappedResult.user && mappedResult.user.signUp) {
      dispatch(setLogin({
        ...mappedResult,
        email: form.email,
        password: null,
        success: true
      }))

      return mappedResult
    }

    if (mappedResult.success && mappedResult.user && !mappedResult.user.signUp) {
      dispatch(setLogin({
        ...mappedResult,
        ...form,
        email: form.email,
        password: null,
        success: true
      }))

      return mappedResult
    }

    // dispatch(setNotification({
    //   type: 'warning',
    //   message: 'Não foi possível fazer login com o Google.'
    // }))
  } catch (e) {
    console.log(e)
  }
}
