import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { fetchUserList, users, pats, rdvs, Hist, Gest, ress, doss } from '@/types/data';
import { Pat, Rdv, History, DossMed, User, GestHor, Ressource } from '@/types';


const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI'
const mock = new MockAdapter(axios, { onNoMatch: 'passthrough' });
export default async function configureFakeBackend() {
	await fetchUserList();
	console.log('Users : ' , users)
	console.log('pats : ' , pats)
	console.log('gest : ' ,Gest)
	console.log('ress : ' , ress)
	console.log('doss : ' , doss)
	console.log('hist : ' , Hist)
	console.log('rdvs : ' , rdvs)
	mock.onPost('/login').reply(function (config) {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				// get parameters from post request
				const params = JSON.parse(config.data)
				// find if any user matches login credentials
				const filteredUsers = users.filter((user) => {
					return (
						user.UserName === params.UserName && user.UserPassword === params.UserPassword
					)
				})
				if (filteredUsers.length) {
					// if login details are valid return user details and fake jwt token
					const user = filteredUsers[0]
					console.error(String(user.PatId));
                    localStorage.setItem('currentUserId', String(user.PatId));
					localStorage.setItem('currentUserName', String(user.UserName));
					resolve([200, user])
				} else {
					// else return error
					alert("UserName or UserPassword is incorrect")
				}
			}, 1000)
		})
	})

	mock.onPost('/register').reply(function (config) {
        return new Promise(function (resolve, reject) {
            setTimeout(async function () {
                // get parameters from post request
                const params = JSON.parse(config.data)

                // add new users

                const newUser: User = {
					PatId: users.length + 1,
                    UserName: params.UserName,
					UserEmail: params.UserEmail,
                    UserPassword: params.UserPassword,	
                    UserType: 3,
                    token: TOKEN,
                }    
				await axios.post('http://localhost:32187/api/Utilisateurs', newUser);

                resolve([200, newUser])
            }, 1000)
        })
    })

	mock.onPost('/forget-password').reply(function (config) {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				// get parameters from post request
				const params = JSON.parse(config.data)

				// find if any user matches login credentials
				const filteredUsers = users.filter((user) => {
					return user.UserName === params.UserName
				})

				if (filteredUsers.length) {
					// if login details are valid return user details and fake jwt token
					const responseJson = {
						message:
							"We've sent you a link to reset UserPassword to your registered email.",
					}
					resolve([200, responseJson])
				} else {
					// else return error
					resolve([
						401,
						{
							message:
								'Sorry, we could not find any registered user with entered email',
						},
					])
				}
			}, 1000)
		})
	})
}
