import Meetings from './Meetings';
import {authRoles} from '../../auth';


const MeetingsConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user, // ['admin']
	routes: [
		{
			path: '/meetings',
			component: Meetings
		}
	]
};

export default MeetingsConfig;