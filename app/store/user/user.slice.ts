import { checkAuth, login, logout, register } from './user.actions'
import { IUserInitialState } from './user.interface'
import { createSlice } from '@reduxjs/toolkit'

import { getStoreLocal } from '@/utils/local-storage/localStorage'

//import { getStoreLocal } from '@/utils/local-storage/localStorage'

const initialState: IUserInitialState = {
	//user: { email: 'hello@gmail.com', isAdmin: true, username: 'user2', avatarURL: '' },
	/*
		user: {
		email: 'hello@gmail.com',
		username: 'user2',
		_id: 'fdfd1fd1fedfcd12',
		birthdate: new Date('06061996'),
		roles: [Role.User],
	},
	*/

	user: getStoreLocal('user'),
	isLoading: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(register.rejected, (state) => {
				state.isLoading = false
				state.user = null
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(login.rejected, (state) => {
				state.isLoading = false
				state.user = null
			})
			.addCase(logout.fulfilled, (state) => {
				state.isLoading = false
				state.user = null
			})
			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.user = payload.user
			})
	},
})

export const { reducer } = userSlice
