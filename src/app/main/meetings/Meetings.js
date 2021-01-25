import React, { useEffect, useState } from 'react';
import MeetingForm from '@fuse/core/MeetingForm';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import axios from 'axios';
import jwtService from 'app/services/jwtService';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles(theme => ({
	layoutRoot: {},
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function MeetingsPage(props) {
	const classes = useStyles(props);
	const user = useSelector(({ auth }) => auth.user);
	const dispatch = useDispatch();

	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [data, setData] = useState({ meetings: [], isFetching: false });

	useEffect(() => {
		setData({ meetings: data.meetings, isFetching: true });

		async function fetchData() {
			await axios
				.get('https://qalisa-backend.herokuapp.com/meetings', {
					headers: {
						'Authorization': 'Bearer ' + jwtService.getAccessToken()
					}
				})
				.then(response => {
					console.log(response);
					if (response.status >= 200 && response.status <= 299) {
						setData({ meetings: response.data, isFetching: false });
					} else {
						console.log(response);
					}
				}).catch(error => {
					console.log(error);
					setData({ meetings: data.meetings, isFetching: false });
					dispatch(showMessage({ message: "There was an error in retrieving your meetings." }));
				});
		}

		fetchData();

	}, []);

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="p-24">
					<h4>Meetings</h4>
				</div>
			}
			content={
				<div className="p-24 justify-center">
					{data.isFetching ? <CircularProgress /> : ((data.meetings === null) ? <div /> :
						(
							<div>
								<Button
									variant="contained"
									color="primary"
									className="mx-auto mt-16 normal-case"
									aria-label="Create New Milestone"
									onClick={handleOpen}
								>
									Create New Meeting
								</Button>
								<Modal
									open={open}
									onClose={handleClose}
									aria-labelledby="simple-modal-title"
									aria-describedby="simple-modal-description"
								>
									<div style={modalStyle} className={classes.paper}>
										<MeetingForm />
									</div>
								</Modal>
								<h2>Here are your meetings:</h2>
								{
									data.meetings.map(_item => (
										<Paper square {...props.innerProps} style={{ margin: '10px' }} key={_item.id}>
											<h3>Link: <a href={_item.url}>{_item.url}</a></h3>
											<h3>Invite message: {_item.inviteMessage}</h3>
											<h3>Due date: {moment(_item.datetime).format('lll')}</h3>
											<h3>Attendants:</h3>
											{_item.attendants.map(attendant => (
												<h4 key={attendant.id}>{attendant.username}</h4>
											))}
										</Paper>
									))
								}
							</div>
						)
					)}
				</div>
			}
		/>
	);
}

export default MeetingsPage;
