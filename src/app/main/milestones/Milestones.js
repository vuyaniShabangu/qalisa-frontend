import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function MilestonesPage(props) {
	const classes = useStyles(props);
	const { t } = useTranslation('examplePage');

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="p-24">
					<h4>{t('TITLE')}</h4>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					<h4>Content Toolbar here</h4>
				</div>
			}
			content={
				<div className="p-24">
					<h4>Content</h4>
					<br />
					<DemoContent />
				</div>
			}
		/>
	);
}

export default MilestonesPage;
