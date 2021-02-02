import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);


const navigationConfig = [
	{
		id: 'applications',
		title: '',
		translate: 'APPLICATIONS',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'home-component',
				title: 'Home',
				translate: 'HOME',
				type: 'item',
				icon: 'home',
				url: '/home'
			},
			/*{
				id: 'ventures-component',
				title: 'Ventures',
				type: 'item',
				icon: 'business',
				url: '/ventures'
			},*/
			{
				id: 'miletones-component',
				title: 'Milestones',
				type: 'item',
				icon: 'emoji_flags',
				url: '/milestones'
			},
			{
				id: 'meetings-component',
				title: 'Meetings',
				type: 'item',
				icon: 'calendar_today',
				url: '/meetings'
			},
			/*{
				id: 'advisor-component',
				title: 'Advisor Application',
				type: 'item',
				icon: 'person',
				url: '/advisor-application'
			}*/
		]
	}
];

export default navigationConfig;
