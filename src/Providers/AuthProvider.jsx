import { createContext, useEffect, useState } from 'react';
import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { app } from '../firebase/Firebase.init';
import PropTypes from 'prop-types';
import useAxiosPublic from '../Hooks/useAxiosPublic';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const axiosPublic = useAxiosPublic();

	const createUser = async (email, password) => {
		try {
			setLoading(true);
			return await createUserWithEmailAndPassword(auth, email, password);
		} catch (error) {
			setLoading(false);
			console.log(error.message);
			throw error;
		}
	};

	const logIn = async (email, password) => {
		try {
			setLoading(true);
			return await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			setLoading(false);
			console.log(error.message);
			throw error;
		}
	};

	const googleSignIn = async () => {
		try {
			setLoading(true);
			return await signInWithPopup(auth, googleProvider);
		} catch (error) {
			setLoading(false);
			console.log(error.message);
			throw error;
		}
	};

	const logOut = async () => {
		try {
			setLoading(true);
			return await signOut(auth);
		} catch (error) {
			setLoading(false);
			console.log(error.message);
			throw error;
		}
	};

	const updateUserProfile = async (name, photo) => {
		try {
			return await updateProfile(auth.currentUser, {
				displayName: name,
				photoURL: photo,
			});
		} catch (error) {
			console.log(error.message);
			throw error;
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser);

			if (currentUser) {
				const userInfo = { email: currentUser.email };
				axiosPublic.post('/jwt', userInfo).then(res => {
					if (res.data.token) {
						localStorage.setItem('access-token', res.data.token);
						setLoading(false);
					}
				});
			} else {
				localStorage.removeItem('access-token');
				setLoading(false);
			}
		});
		return () => unsubscribe();
	}, [axiosPublic]);

	const authInfo = {
		user,
		setUser,
		loading,
		createUser,
		logIn,
		googleSignIn,
		logOut,
		updateUserProfile,
	};

	return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthProvider;
