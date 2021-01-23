import React, { useEffect, useState } from 'react';
import { TextFieldFormsy, SelectFormsy, FuseChipSelectFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Formsy from 'formsy-react';
import countryList from './countryList';
import Twitter from '@material-ui/icons/Twitter';
import LinkedIn from '@material-ui/icons/LinkedIn';
import Facebook from '@material-ui/icons/Facebook';
import Youtube from '@material-ui/icons/YouTube';
import Instagram from '@material-ui/icons/Instagram';
import axios from 'axios';
import jwtService from 'app/services/jwtService';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';




function VentureForm(props) {
	const user = useSelector(({ auth }) => auth.user);
	const dispatch = useDispatch();

	const [isFormValid, setIsFormValid] = useState(false);
	const [isWaitingForRequest, setIsWaitingForRequest] = useState(false);
	const values = {
		someDate: "2017-05-24"
	};

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		model.entrepreneur = user.id;
		console.log(model);
		return new Promise((resolve, reject) => {
			setIsWaitingForRequest(true);
			axios
				.post('https://qalisa-backend.herokuapp.com/ventures', {
					...model,
					headers: {
						'Authorization': 'Bearer ' + jwtService.getAccessToken()
					}
				})
				.then(response => {
					console.log(response);
					if (response.status >= 200 && response.status <= 299) {
						console.log(response.data);
						dispatch(showMessage({ message: "Your venture has been registered for review." }));
						window.location.reload();
						resolve(response.data);
					} else {
						console.log(response);
						dispatch(showMessage({ message: "Your venture could not be registed, please try again later." }));
						reject(response.data.error);
					}
				}).catch(error => {
					console.log(error)
					dispatch(showMessage({ message: "Your venture could not be registed, please try again later." }));
				});
		});
	}

	const clientTypeSuggestions = ['B2B', 'B2B2B', 'B2B2G', 'B2C', 'C2C', 'Governments (B2G)', 'Non-profits'].map(item => ({
		value: item,
		label: item
	}));

	const clientBasedSuggestions = ['Urban based client(s)', 'Rural based client(s)',].map(item => ({
		value: item,
		label: item
	}));

	const sectorSuggestions = ['Agrichemicals', 'Animal farming', 'Crop farming', 'Farm machinery', 'Fish farming', 'Accounting services', 'Consulting and business development', 'Diversified services', 'Enterprise software', 'HR and recruitment', 'Legal services', 'Marketing and PR', 'Biofuels', 'Biomass', 'Clean technology', 'Environmental services', 'Green transportation and electric motors', 'Hydropower', 'Renewable energy', 'Solar power', 'Utilities', 'Electric utilities', 'Natural gas utilities', 'Waste management and recycling', 'Wind power', 'Construction', 'Manufacturing', '3D printing', 'Automotive', 'Clothing and textiles production', 'Computer hardware', 'Electronics', 'Food production', 'Furniture', 'Packaging', 'Real estate', 'Animation', 'Arts', 'Fashion', 'Film production', 'Graphic design', 'Media production', 'Music', 'Photography', 'Video production', 'Educational products', 'Educational services', 'Banking', 'Insurance', 'Investment management', 'Remittance', 'Biotechnology and medical research', 'Healthcare providers and services', 'Medical equipment and supplies', 'Pharmaceuticals', 'Sexual and reproductive health and rights', 'Adtech', 'Agritech', 'Artificial intelligence', 'Big data', 'Blockchain', 'Cloud solutions', 'Computer games', 'Computer software', 'Connectivity', 'E-commerce', 'E-learning', 'E-sports', 'Fintech', 'Information technology', 'Internet', 'Internet of things (IoT)', 'Machine learning', 'Mobile', 'Nanotech', 'New media', 'Online analytics', 'Online payment processing', 'Quantum computing', 'Smart city solutions', 'Software as a Service', 'Telecom', 'UAVs (drones)', 'Virtual reality', 'Events', 'Hospitality', 'Sports and wellness', 'Tourism', 'Consumer durables', 'Cars', 'Furniture', 'Household appliances', 'Luxury goods and jewelry', 'Consumer non-durables', 'Clothing and textiles', 'Drugs and cosmetics', 'Food and beverage', 'Import and export', 'Retail', 'Specialty retail', 'Wholesale', 'Logistics', 'Personal transport', 'Post and express', 'Public transport', 'Community water systems', 'Hygiene', 'Sanitation', 'Water storage', 'Water treatment', 'Water utilities'].map(item => ({
		value: item,
		label: item
	}));




	return (
		<div className="max-w-md m-32">
			<h1>Add your venture</h1>
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				className="flex flex-col justify-center w-full"
			>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="companyName"
					label="Company Name"
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
					name="tagLine"
					label="Tagline"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="date"
					name="foundingDate"
					label="Fouding Date"
					defaultValue={values.someDate}
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

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="pitch"
					label="Pitch"
					multiline
					rows={4}
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="pitchUrlVideo"
					label="Pitch video URL"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					variant="outlined"

				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="fullAddress"
					label="Full Address"
					multiline
					rows={2}
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="phoneNumber"
					label="Phone Number"
					validations={{
						minLength: 4,
						maxLength: 20
					}}
					validationErrors={{
						minLength: 'Min character length is 4',
						maxLength: 'Max character length is 20'
					}}
					variant="outlined"
					required
				/>

				<SelectFormsy
					className="mb-16"
					name="stage"
					label="Stage"
					variant="outlined"
				>
					<MenuItem value="Idea/Concept stage">Idea/Concept stage</MenuItem>
					<MenuItem value="Startup stage">Startup stage</MenuItem>
					<MenuItem value="Growth stage">Growth stage</MenuItem>
					<MenuItem value="Mature stage">Mature stage</MenuItem>
				</SelectFormsy>

				<FuseChipSelectFormsy
					className="mb-16"
					name="typeOfClientsServed"
					placeholder=""
					variant="outlined"
					textFieldProps={{
						label: 'What type of clients do you serve?',
						InputLabelProps: {
							shrink: true
						},
						variant: 'outlined'
					}}
					options={clientTypeSuggestions}
					isMulti
					validations={{ minLength: 1 }}
					validationErrors={{
						minLength: 'You need to select at least 1'
					}}
					required
				/>

				<FuseChipSelectFormsy
					className="mb-16"
					name="whereAreClientsBased"
					placeholder=""
					variant="outlined"
					textFieldProps={{
						label: 'Where are your clients based?',
						InputLabelProps: {
							shrink: true
						},
						variant: 'outlined'
					}}
					options={clientBasedSuggestions}
					isMulti
					validations={{ minLength: 1 }}
					validationErrors={{
						minLength: 'You need to select at least 1'
					}}
					required
				/>

				<FuseChipSelectFormsy
					className="mb-16"
					name="sectors"
					placeholder=""
					variant="outlined"
					textFieldProps={{
						label: 'Sectors',
						InputLabelProps: {
							shrink: true
						},
						variant: 'outlined'
					}}
					options={sectorSuggestions}
					isMulti
					validations={{ minLength: 1 }}
					validationErrors={{
						minLength: 'You need to select at least 1'
					}}
					required
				/>

				<FuseChipSelectFormsy
					className="mb-16 z-0"
					name="countries"
					placeholder=""
					variant="standard"
					style=""
					textFieldProps={{
						label: 'Countries',
						InputLabelProps: {
							shrink: true
						},
						variant: 'outlined'
					}}
					options={countryList}
					isMulti
					validations={{ minLength: 1 }}
					validationErrors={{
						minLength: 'You need to select at least 1'
					}}
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="website"
					label="Website"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4',
					}}
					variant="outlined"
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="twitter"
					label="Twitter"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Twitter />
							</InputAdornment>
						),
					}}
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4',
					}}
					variant="outlined"
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="linkedIn"
					label="LinkedIn"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<LinkedIn />
							</InputAdornment>
						),
					}}
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4',
					}}
					variant="outlined"
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="facebook"
					label="Facebook"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Facebook />
							</InputAdornment>
						),
					}}
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4',
					}}
					variant="outlined"
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="youtube"
					label="Youtube"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Youtube />
							</InputAdornment>
						),
					}}
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4',
					}}
					variant="outlined"
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="instagram"
					label="Instagram"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<Instagram />
							</InputAdornment>
						),
					}}
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4',
					}}
					variant="outlined"
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
					Submit Venture
				</Button>
			</Formsy>

		</div>
	);
}

export default React.memo(VentureForm);
