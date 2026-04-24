import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import useAxiosSecure from './useAxiousSecure'; // আপনার ফাইলের স্পেলিং অনুযায়ী (Axious)
import { AuthContext } from '../Context/AuthContext';

const useRole = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { isLoading: roleLoading, data: role, isError } = useQuery({

        queryKey: ['user-role', user?.email],
    
        enabled: !loading && !!user?.email, 
        
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/users/role/${user.email}`);
                return res.data.role;
            } catch (error) {
                console.error("Error fetching user role:", error);
                return 'user'; 
            }
        },

        staleTime: 1000 * 60 * 15,
        retry: 1 
    });

    return [role || 'user', roleLoading];
};

export default useRole;