// hooks/useAdmin.js
import { useState, useEffect } from 'react';
import  AuthService  from '../services/auth.service'; // Import your auth service

const useAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserRole = async () => {
            setLoading(true);
            try {
                const userPromise =  AuthService.getCurrentUser();

                // Chờ Promise resolved và lấy giá trị user
                const user = (await userPromise).data;

                if (user && user.roles && Array.isArray(user.roles) && user.roles.includes('ROLE_ADMIN')) {
                    setIsAdmin(true);
                }
                else{
                    setIsAdmin(false);
                }
            }
            catch(error){
                console.log("Error checking user roles", error);
            }
            finally{
                setLoading(false);
            }
        };
        checkUserRole();
    }, []);
    return { isAdmin, loading };
}
export default useAdmin;