import Meetings from './Meetings';


const MeetingsConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/meetings',
			component: Meetings
		}
	]
};

export default MeetingsConfig;