import React, { useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    AuthError,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Auth: React.FC = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAuthAction = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLoginView) {
                // Handle Login
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                // Handle Registration
                if (!fullName) {
                    setError('Please enter your full name.');
                    setLoading(false);
                    return;
                }
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userCredential.user, {
                    displayName: fullName,
                });
            }
            // onAuthStateChanged in App.tsx will handle the redirect
        } catch (err) {
            const authError = err as AuthError;
            switch (authError.code) {
                case 'auth/email-already-in-use':
                    setError('This email is already registered. Please log in.');
                    break;
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                     setError('Invalid email or password. Please try again.');
                     break;
                case 'auth/weak-password':
                    setError('Password should be at least 6 characters long.');
                    break;
                default:
                    setError('An error occurred. Please try again.');
                    console.error(authError);
            }
        } finally {
            setLoading(false);
        }
    };
    
    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError('');
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
             // onAuthStateChanged in App.tsx will handle the redirect
        } catch(err) {
             setError('Failed to sign in with Google. Please try again.');
             console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
                <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                        <span className="text-4xl mr-2">🎓</span>
                        <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">eduAssist</h1>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                        {isLoginView ? 'Welcome Back!' : 'Create an Account'}
                    </h2>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        {isLoginView ? 'Sign in to continue your learning journey.' : 'Join to start your learning journey today.'}
                    </p>
                </div>
                
                {error && <p className="text-sm text-red-500 text-center bg-red-100 dark:bg-red-900/50 p-2 rounded-md">{error}</p>}
                
                <form className="space-y-4" onSubmit={handleAuthAction}>
                    {!isLoginView && (
                         <input
                            id="full-name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="appearance-none relative block w-full px-3 py-3 border border-slate-300 dark:border-slate-600 placeholder-slate-500 text-slate-900 dark:text-white bg-white dark:bg-slate-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Full Name"
                        />
                    )}
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none relative block w-full px-3 py-3 border border-slate-300 dark:border-slate-600 placeholder-slate-500 text-slate-900 dark:text-white bg-white dark:bg-slate-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Email address"
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="appearance-none relative block w-full px-3 py-3 border border-slate-300 dark:border-slate-600 placeholder-slate-500 text-slate-900 dark:text-white bg-white dark:bg-slate-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Password"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                    >
                        {loading ? 'Processing...' : (isLoginView ? 'Sign in' : 'Create Account')}
                    </button>
                </form>

                 <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
                    <span className="flex-shrink mx-4 text-slate-400 text-xs">OR</span>
                    <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
                </div>

                 <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center py-3 px-4 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600"
                >
                    <svg className="w-5 h-5 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 76.2c-27.5-26.2-63.4-42.4-101.6-42.4-88.6 0-161.2 72.2-161.2 161.2s72.6 161.2 161.2 161.2c38.2 0 74.6-16.2 101.6-42.4l76.2 76.2C374.2 480.6 314.8 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 76.2c-27.5-26.2-63.4-42.4-101.6-42.4-88.6 0-161.2 72.2-161.2 161.2s72.6 161.2 161.2 161.2c38.2 0 74.6-16.2 101.6-42.4l76.2 76.2C374.2 480.6 314.8 504 248 504z"></path></svg>
                    Sign in with Google
                </button>

                <p className="text-sm text-center text-slate-500 dark:text-slate-400">
                    {isLoginView ? "Don't have an account?" : 'Already have an account?'}
                    <button onClick={() => { setIsLoginView(!isLoginView); setError(''); }} className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                        {isLoginView ? 'Sign up' : 'Sign in'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Auth;
