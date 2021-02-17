import React, { useEffect, useState } from 'react';
import MilestoneForm from '@fuse/core/MilestoneForm';
import MilestoneUpdateForm from '@fuse/core/MilestoneUpdateForm';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import axios from 'axios';
import jwtService from 'app/services/jwtService';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import moment from 'moment';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
	table: {
		maxWidth: 900,
		marginBottom: 30
	},
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function MilestonesPage(props) {
	const classes = useStyles(props);
	const user = useSelector(({ auth }) => auth.user);
	const dispatch = useDispatch();

	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);
	const [selectedMilestone, setSelectedMilestone] = React.useState();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [updateOpen, setUpdateOpen] = React.useState(false);
	function handleUpdateOpen(milestone) {
		console.log(milestone);
		setSelectedMilestone(milestone);
		setUpdateOpen(true);
	};

	const handleUpdateClose = () => {
		setUpdateOpen(false);
	};

	const [data, setData] = useState({ milestoneInfo: [], isFetching: false });

	useEffect(() => {
		setData({ milestoneInfo: data.milestoneInfo, isFetching: true });

		async function fetchData() {
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
					dispatch(showMessage({ message: "There was an error in retrieving your milesones." }));
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
				<div className="p-24 justify-center">
					<h2>Milestones</h2>
				</div>
			}
			content={
				<div className="p-24 justify-center">
					{data.isFetching ? <CircularProgress /> : ((data.milestoneInfo === null) ? <div /> :
						(
							<div>
								<Button
									variant="contained"
									color="primary"
									className="mx-auto mt-16 normal-case"
									aria-label="Create New Milestone"
									onClick={handleOpen}
								>
									Create New Milestone
								</Button>
								<Modal
									open={open}
									onClose={handleClose}
									aria-labelledby="simple-modal-title"
									aria-describedby="simple-modal-description"
								>
									<div style={modalStyle} className={classes.paper}>
										<MilestoneForm />
									</div>
								</Modal>

								<Modal
									open={updateOpen}
									onClose={handleUpdateClose}
									aria-labelledby="simple-modal-title"
									aria-describedby="simple-modal-description"
								>
									<div style={modalStyle} className={classes.paper}>
										<MilestoneUpdateForm milestone={selectedMilestone} />
									</div>
								</Modal>

								<Typography variant="h6" gutterBottom>
									Here are the milestones that have been assigned to you:
      							</Typography>
								<TableContainer component={Paper} className={classes.table}>
									<Table aria-label="simple table">
										<TableHead>
											<TableRow>
												<TableCell>Title</TableCell>
												<TableCell>Description</TableCell>
												<TableCell>Start date</TableCell>
												<TableCell>Due date</TableCell>
												<TableCell>Progress update</TableCell>
												<TableCell>Progress</TableCell>
												<TableCell>Update</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{data.milestoneInfo.filter(m => (m.assignee.id === user.id)).map(_item => (
												<TableRow key={_item.id}>
													<TableCell component="th" scope="row">
														{_item.title}
													</TableCell>
													<TableCell>{_item.description}</TableCell>
													<TableCell>{moment(_item.startDate).format('lll')}</TableCell>
													<TableCell>{moment(_item.dueDate).format('lll')}</TableCell>
													<TableCell>{_item.progressUpdate}</TableCell>
													<TableCell><strong>{_item.progress}</strong></TableCell>
													<TableCell><Button
														variant="contained"
														color="primary"
														className="mx-auto mt-16 normal-case"
														aria-label="Update"
														onClick={() => handleUpdateOpen(_item)}
													>Update</Button>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>

								<Typography variant="h6" gutterBottom>
									Here are the milestones milestones that you have assigned to others:
      							</Typography>
								<TableContainer component={Paper} className={classes.table}>
									<Table aria-label="simple table">
										<TableHead>
											<TableRow>
												<TableCell>Title</TableCell>
												<TableCell>Description</TableCell>
												<TableCell>Start date</TableCell>
												<TableCell>Due date</TableCell>
												<TableCell>Progress update</TableCell>
												<TableCell>Progress</TableCell>
												<TableCell>Update</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{data.milestoneInfo.filter(m => (m.assigner.id === user.id)).map(_item => (
												<TableRow key={_item.id}>
													<TableCell component="th" scope="row">
														{_item.title}
													</TableCell>
													<TableCell>{_item.description}</TableCell>
													<TableCell>{moment(_item.startDate).format('lll')}</TableCell>
													<TableCell>{moment(_item.dueDate).format('lll')}</TableCell>
													<TableCell>{_item.progressUpdate}</TableCell>
													<TableCell><strong>{_item.progress}</strong></TableCell>
													<TableCell><Button
														variant="contained"
														color="primary"
														className="mx-auto mt-16 normal-case"
														aria-label="Update"
														onClick={() => handleUpdateOpen(_item)}
													>Update</Button>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</div>
						)
					)}
				</div>
			}
		/>
	);
}

export default MilestonesPage;
