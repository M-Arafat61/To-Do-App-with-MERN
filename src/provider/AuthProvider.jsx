import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../authentication/firebase.config";
import { axiosPublic } from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      setUser(currentUser);
      console.log("current-user from observer", currentUser?.email);
      console.log("current-user from user", user?.email);
      setLoading(false);
      if (currentUser) {
        const fetchJwt = async () => {
          try {
            await axiosPublic.post("/auth/jwt", loggedUser, {
              withCredentials: true,
            });
            // console.log(response.config.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchJwt();
      } else {
        const fetchLogout = async () => {
          try {
            const response = await axiosPublic.post(
              "/auth/logout",
              loggedUser,
              {
                withCredentials: true,
              }
            );
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchLogout();
      }
    });
    return () => {
      return unsubscribe();
    };
  }, [user?.email]);
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    updateUserProfile,
    googleSignIn,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
