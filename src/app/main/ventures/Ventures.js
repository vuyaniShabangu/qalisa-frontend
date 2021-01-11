import VentureView from '@fuse/core/VentureView';
import VentureForm from '@fuse/core/VentureForm';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import React from 'react';

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function VenturesPage(props) {
	const classes = useStyles(props);
	const user = useSelector(({ auth }) => auth.user);

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="p-24">
					<h4>Ventures</h4>
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
					{(user.ventures.length < 0) ? <VentureView venture={user.ventures[0]} /> : <VentureForm />}
				</div>
			}
		/>
	);
}

export default VenturesPage;
