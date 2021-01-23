import React, { useEffect, useRef, useState } from 'react';
import MilestoneForm from '@fuse/core/MilestoneForm';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import axios from 'axios';
import jwtService from 'app/services/jwtService';
import { useDispatch } from 'react-redux';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function MilestonesPage(props) {
	const classes = useStyles(props);
	const user = useSelector(({ auth }) => auth.user);
	const dispatch = useDispatch();

	//const [advisorApplicationInfo, setAdvisorApplicationInfo] = useState(["initial"]);
	const [data, setData] = useState({ milestoneInfo: [], isFetching: false });

	useEffect(async () => {
		setData({ milestoneInfo: data.milestoneInfo, isFetching: true });
		await axios
			.get('https://qalisa-backend.herokuapp.com/milestones', {
				headers: {
					'Authorization': 'Bearer ' + jwtService.getAccessToken()
				}
			})
			.then(response => {
				console.log(response);
				if (response.status >= 200 && response.status <= 299) {
					setData({ milestoneInfo: response.data, isFetching: false });
				} else {
					console.log(response);
				}
			}).catch(error => {
				console.log(error);
				setData({ milestoneInfo: data.milestoneInfo, isFetching: false });
				dispatch(showMessage({ message: "There was an error in retrieving your advisor application." }));
			});

	}, []);

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="p-24 justify-center">
					<h2>Milestones</h2>
				</div>
			}
			content={
				<div className="p-24 justify-center">
					{data.isFetching ? <h2>Fetching Milestones</h2> : ((data.milestoneInfo == null) ? <div /> :
						(
							<div>
								<h2>Here the milestones have been assigned to you:</h2>
								{
									data.milestoneInfo.filter(m => (m.assignee.id == user.id)).map(_item => (
										<Paper square className={classes.paper} {...props.innerProps} style={{margin: '10px'}}>
											<h3>Description: {_item.description}</h3>
											<h3>Start date: {moment(_item.startDate).format('lll')}</h3>
											<h3>Due date: {moment(_item.dueDate).format('lll')}</h3>
											<h3>Status: {_item.done}</h3>
										</Paper>
									))
								}

								<h2>Here the milestones milestones that you have assigned:</h2>
								{
									data.milestoneInfo.filter(m => (m.assigner.id == user.id)).map(_item => (

										<Paper square className={classes.paper} {...props.innerProps} style={{margin: '10px'}}>
											<h3>Description: {_item.description}</h3>
											<h3>Start date: {moment(_item.startDate).format('lll')}</h3>
											<h3>Due date: {moment(_item.dueDate).format('lll')}</h3>
											<h3>Status: {_item.done}</h3>
										</Paper>
									))
								}

								<MilestoneForm />
							</div>
						)
					)}
				</div >
			}
		/>
	);
}

export default MilestonesPage;
