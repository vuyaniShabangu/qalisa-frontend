import React, { useState, useEffect } from 'react';
import { TextFieldFormsy, SelectFormsy, FuseChipSelectFormsy } from '@fuse/core/formsy';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Formsy from 'formsy-react';
import axios from 'axios';
import jwtService from 'app/services/jwtService';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import CircularProgress from '@material-ui/core/CircularProgress';



function MeetingForm(props) {
	const user = useSelector(({ auth }) => auth.user);
	const dispatch = useDispatch();

	const [isFormValid, setIsFormValid] = useState(false);
	const [isWaitingForRequest, setIsWaitingForRequest] = useState(false);
	const [possibleUsers, setPossibleUsers] = useState([]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
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
						setPossibleUsers(response.data.map(user => ({
							value: user.id,
							label: user.username
						})));
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
		return new Promise((resolve, reject) => {
			setIsWaitingForRequest(true);
			model.attendants = model.attendants.map(attendant => (attendant.value))
			axios
				.post('https://qalisa-backend.herokuapp.com/meetings', {
					...model,
					headers: {
						'Authorization': 'Bearer ' + jwtService.getAccessToken()
					}
				})
				.then(response => {
					console.log(response);
					if (response.status >= 200 && response.status <= 299) {
						console.log(response.data);
						dispatch(showMessage({ message: "The meeting has been added." }));
						window.location.reload();
						resolve(response.data);
					} else {
						console.log(response);
						dispatch(showMessage({ message: "Your meeting could not be added, please try again later." }));
						reject(response.data.error);
					}
				}).catch(error => {
					console.log(error)
					dispatch(showMessage({ message: "Your meeting could not be added, please try again later." }));
				});
			setIsWaitingForRequest(false);
		});
	}




	return (
		<div className="max-w-md m-32">
			<h1>Create a new meeting</h1>
			{isWaitingForRequest ? <CircularProgress /> : <Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				className="flex flex-col justify-center w-full"
			>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="url"
					label="Link"
					validations={{
						minLength: 1
					}}
					validationErrors={{
						minLength: 'Min character length is 1'
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="inviteMessage"
					label="Invite message"
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

				<FuseChipSelectFormsy
					className="mb-16"
					name="attendants"
					placeholder=""
					variant="outlined"
					textFieldProps={{
						label: 'Attendants',
						InputLabelProps: {
							shrink: true
						},
						variant: 'outlined'
					}}
					options={possibleUsers}
					isMulti
					validations={{ minLength: 1 }}
					validationErrors={{
						minLength: 'You need to select at least 1'
					}}
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="datetime-local"
					name="datetime"
					label="Date & Time"
					InputLabelProps={{
						shrink: true,
					}}
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					variant="outlined"
					required
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16 normal-case"
					aria-label="Submit Venture"
					disabled={!isFormValid}
					value="legacy"
				>
					Submit Milestone
				</Button>
			</Formsy>}

		</div>
	);
}

export default React.memo(MeetingForm);
