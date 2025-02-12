import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const usePremium = () => {
	const { user, loading } = useAuth();
	const axiosSecure = useAxiosSecure();

	const { data: isPremium, isPending: isPremiumLoading } = useQuery({
		queryKey: [user?.email, 'isPremium'],
		enabled: !loading,
		queryFn: async () => {
			const res = await axiosSecure.get(`/users/${user.email}`);
			return res.data?.premiumTaken && Date.now() < res.data.premiumTaken;
		},
	});

	return [isPremium, isPremiumLoading];
};

export default usePremium;
