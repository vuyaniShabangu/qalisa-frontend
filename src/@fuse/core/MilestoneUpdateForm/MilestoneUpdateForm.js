import React, { useState, useEffect } from 'react';
import { TextFieldFormsy } from '@fuse/core/formsy';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Formsy from 'formsy-react';
import axios from 'axios';
import jwtService from 'app/services/jwtService';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';




function MilestoneUpdateForm(props) {
	const user = useSelector(({ auth }) => auth.user);
	const dispatch = useDispatch();

	const [isFormValid, setIsFormValid] = useState(false);
	const [isWaitingForRequest, setIsWaitingForRequest] = useState(false);
	const [possibleUsers, setPossibleUsers] = useState([]);
	const [value, setValue] = React.useState(props.milestone.progress);

	const handleSliderChange = (event, newValue) => {
		setValue(newValue);
	};

	const getSliderColor = (val) => {
		if(val < 33)
			return 'red';
		else if (val>=33 && val<66)
				return 'orange';
		else if(val>=66)
				return 'green'
	}

	const muiTheme = createMuiTheme({
		overrides: {
			MuiSlider: {
				thumb: {
					color: getSliderColor(value),
					fontSize: 50
				},
				track: {
					color: getSliderColor(value),
					fontSize: 50
				},
				rail: {
					color: getSliderColor(value),
					fontSize: 50
				}
			}
		}
	});

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	const marks = [
		{
			value: 0,
			label: '0%',
		},
		{
			value: 25,
			label: '25%',
		},
		{
			value: 50,
			label: '50%',
		},
		{
			value: 75,
			label: '75%',
		},
		{
			value: 100,
			label: '100%',
		},
	];

	function valuetext(value) {
		return '${value}%';
	}



	useEffect(() => {
		setIsWaitingForRequest(true);
		async function getUsers() {
			await axios
				.get('https://qalisa-backend.herokuapp.com/users', {
					headers: {
						'Authorization': 'Bearer ' + jwtService.getAccessToken()
					}
				})
				.then(response => {
					console.log(response);
					if (response.status >= 200 && response.status <= 299) {
						setPossibleUsers(response.data);
					} else {
						console.log(response);
					}
				}).catch(error => {
					console.log(error);
					setPossibleUsers([]);
					dispatch(showMessage({ message: "There retrieving possible users for this milestone." }));
				});
		}
		getUsers()
		setIsWaitingForRequest(false);
	}, []);

	function handleSubmit(model) {
		let updatedMilestone = props.milestone;
		updatedMilestone.progress = value;
		updatedMilestone.progressUpdate = model.progressUpdate;

		return new Promise((resolve, reject) => {
			setIsWaitingForRequest(true);
			axios
				.put('https://qalisa-backend.herokuapp.com/milestones/' + props.milestone.id, {
					...updatedMilestone,
					headers: {
						'Authorization': 'Bearer ' + jwtService.getAccessToken()
					}
				})
				.then(response => {
					console.log(response);
					if (response.status >= 200 && response.status <= 299) {
						console.log(response.data);
						dispatch(showMessage({ message: "The milestone has been updated." }));
						window.location.reload();
						resolve(response.data);
					} else {
						console.log(response);
						dispatch(showMessage({ message: "Your milestone could not be added, please try again later." }));
						reject(response.data.error);
					}
				}).catch(error => {
					console.log(error)
					dispatch(showMessage({ message: "Your milestone could not be added, please try again later." }));
				});
			setIsWaitingForRequest(false);
		});
	}




	return (
		<div className="max-w-md m-32">
			<h1>Update milestone</h1>
			{isWaitingForRequest ? <CircularProgress /> : <Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				className="flex flex-col justify-center w-full"
			>

				<Typography variant="h5" gutterBottom>
					{props.milestone.title}
				</Typography>

				<Typography variant="body2" gutterBottom>
					{props.milestone.description}
				</Typography>
				<Typography variant="overline" display="block" gutterBottom>
					Assigned to: <strong>{props.milestone.assignee.username}</strong>
				</Typography>
				<Typography variant="overline" display="block" gutterBottom>
					Start date: <strong>{moment(props.milestone.startDate).format('lll')}</strong>
				</Typography>
				<Typography variant="overline" display="block" gutterBottom>
					Due date: <strong>{moment(props.milestone.dueDate).format('lll')}</strong>
				</Typography>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="progressUpdate"
					label="Progress update"
					value={props.milestone.progressUpdate}
					multiline
					rows={4}
					validations={{
						minLength: 1
					}}
					validationErrors={{
						minLength: 'Min character length is 1'
					}}
					variant="outlined"
					required
				/>

				<ThemeProvider theme={muiTheme}>
					<Slider
						defaultValue={80}
						getAriaValueText={valuetext}
						aria-labelledby="discrete-slider-always"
						step={10}
						marks={marks}
						valueLabelDisplay="on"
						value={typeof value === 'number' ? value : 0}
						onChange={handleSliderChange}
						color="info"
					/>
				</ThemeProvider>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16 normal-case"
					aria-label="Submit Venture"
					disabled={!isFormValid}
					value="legacy"
				>
					Update Milestone
				</Button>
			</Formsy>}

		</div>
	);
}

export default React.memo(MilestoneUpdateForm);
