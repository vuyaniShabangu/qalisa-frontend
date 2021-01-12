import Advisor from './Advisor';
import {authRoles} from '../../auth';


const AdvisorConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user, // ['admin']
	routes: [
		{
			path: '/advisor-application',
			component: Advisor
		}
	]
};

export default AdvisorConfig;