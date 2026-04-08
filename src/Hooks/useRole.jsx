import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import useAxiosSecure from './useAxiousSecure';
import { AuthContext } from '../Context/AuthContext';


const useRole = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { isLoading: roleLoading, data: role } = useQuery({
        queryKey: ['user-role', user?.email],
        enabled: !loading && !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data.role;
        }
    });

    return [role, roleLoading];
};

export default useRole;