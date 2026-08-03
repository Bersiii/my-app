import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firbaseconfig"; 

import { doc, getDoc, setDoc } from "firebase/firestore";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return unsub;
  }, []);

  const updateUserData = async (userId) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()) {
        let data = docSnap.data();
        setUser((prevUser) => ({
          ...prevUser,
          username: data.username,
          profileUrl: data.profileUrl,
        }));
        console.log("User data:", docSnap.data());
      }
    } catch (e) {
      console.error("Error updating user data: ", e);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setUser(response.user);
      setIsAuthenticated(true);
      updateUserData(response.user.uid);  
      return { success: true, data: response.user };
    } catch (e) {
      let msg = e.message;
      if (msg.includes("(auth/network-request-failed)")) {
        msg = "Network error. Please try again.";
      }
      if (msg.includes("(auth/email-already-in-use)")) {
        msg = "Email already in use.";
      }
      return { success: false, msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (e) {
      return { success: false, msg: e.message || "Logout failed" };
    }
  };

  const register = async (email, password, username, profileUrl) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log("response.user :", response?.user);

     

      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        profileUrl,
        userId: response?.user?.uid,
      });
      return { success: true, data: response?.user };
    } catch (e) {
      let msg = e.message;
      if (msg.includes("(auth/network-request-failed)")) {
        msg = "Network error. Please try again.";
      }
      if (msg.includes("(auth/email-already-in-use)")) {
        msg = "Email already in use.";
      }
      return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }
  return value;
};
