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

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const createUser = async (email, password) => {
		try {
			setLoading(true);
			const emailPassUser = await createUserWithEmailAndPassword(auth, email, password);
			setLoading(false);
			return emailPassUser;
		} catch (error) {
			setLoading(false);
			console.log(error.message);
			throw error;
		}
	};

	const logIn = async (email, password) => {
		try {
			setLoading(true);
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			setLoading(false);
			console.log(error.message);
			throw error;
		}
	};

	const googleSignIn = async () => {
		try {
			setLoading(true);
			await signInWithPopup(auth, googleProvider);
		} catch (error) {
			setLoading(false);
			console.log(error.message);
			throw error;
		}
	};

	const logOut = async () => {
		try {
			setLoading(true);
			await signOut(auth);
		} catch (error) {
			setLoading(false);
			console.log(error.message);
			throw error;
		}
	};

	const updateUserProfile = async (name, photo) => {
		try {
			await updateProfile(auth.currentUser, {
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
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

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
