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
				id: 'example-component',
				title: 'Example',
				translate: 'EXAMPLE',
				type: 'item',
				icon: 'whatshot',
				url: '/example'
			},
			{
				id: 'ventures-component',
				title: 'Ventures',
				type: 'item',
				icon: 'whatshot',
				url: '/ventures'
			},
			{
				id: 'miletones-component',
				title: 'Milestones',
				type: 'item',
				icon: 'whatshot',
				url: '/milestones'
			},
			{
				id: 'meetings-component',
				title: 'Meetings',
				type: 'item',
				icon: 'whatshot',
				url: '/meetings'
			}
		]
	}
];

export default navigationConfig;
