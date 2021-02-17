import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import jwtService from 'app/services/jwtService';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import CalendarIcon from '@material-ui/icons/CalendarToday';

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
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    navButtons: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function VentureInfo(props) {
    const classes = useStyles(props);
    const dispatch = useDispatch();

    const [data, setData] = useState({ fetchedVenture: [], isFetching: false });

    useEffect(() => {
        setData({ fetchedVenture: data.fetchedVenture, isFetching: true });

        async function fetchData() {
            await axios
                .get('https://qalisa-backend.herokuapp.com/ventures/' + props.venture.id, {
                    headers: {
                        'Authorization': 'Bearer ' + jwtService.getAccessToken()
                    }
                })
                .then(response => {
                    console.log(response);
                    if (response.status >= 200 && response.status <= 299) {
                        setData({ fetchedVenture: response.data, isFetching: false });
                    } else {
                        console.log(response);
                    }
                }).catch(error => {
                    console.log(error);
                    setData({ fetchedVenture: data.fetchedVenture, isFetching: false });
                    dispatch(showMessage({ message: "There was an error in retrieving your venture." }));
                });
        }

        fetchData();

    }, []);

    return (
        <div className="max-w-md m-32">
            {/*My Advisors*/}
            <Typography variant="h6" gutterBottom>
                Here are your advisors:
      		</Typography>
            <TableContainer component={Paper} className={classes.table}>
                {(data.fetchedVenture.advisors == null || data.fetchedVenture.advisors.length === 0) ?
                    <Typography variant="body1" gutterBottom>
                        Your venture has not yet been assigned any advisors.
                    </Typography> :
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.fetchedVenture.advisors.map(_advisor => (
                                <TableRow key={_advisor.id}>
                                    <TableCell component="th" scope="row">
                                        {_advisor.username}
                                    </TableCell>
                                    <TableCell>{_advisor.email}</TableCell>
                                    <TableCell><Button
                                        variant="contained"
                                        color="primary"
                                        className="mx-auto mt-16 normal-case"
                                        aria-label="Update"
                                        onClick={() => { window.open('mailto:' + _advisor.email) }}
                                    >Email</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>}
            </TableContainer>

            <div className={classes.navButtons}>
                <Fab variant="extended" color="primary" onClick={() => window.open('/milestones', '_self')}>
                    <NavigationIcon className={classes.extendedIcon} />
                    Set Milestones
                </Fab>
                <Fab variant="extended" color="secondary" onClick={() => window.open('/meetings', '_self')}>
                    <CalendarIcon className={classes.extendedIcon} />
                    Meet your Advisors
                </Fab>
            </div>
            {/*My Menu; Book and View meetings with Advisors   ----   View and Set your milestones*/}
            <Typography variant="h3" color="inherit" className="font-800 leading-tight">
                {props.venture.companyName}
            </Typography>

            <Typography variant="h6" gutterBottom>
                {props.venture.tagLine}
            </Typography>

            <Typography variant="overline" display="block" gutterBottom>
                Founding date: {props.venture.foundingDate}
            </Typography>

            <Typography variant="body1" gutterBottom>
                {props.venture.pitch}
            </Typography>

            {(props.venture.pitchUrlVideo) && <ReactPlayer className="mb-32 mt-32" url={props.venture.pitchUrlVideo} />}

            <Typography variant="body1" gutterBottom>
                Address: {props.venture.fullAddress}
            </Typography>

            <Typography variant="body1" gutterBottom>
                Website: <a href={props.venture.website}>{props.venture.website}</a>
            </Typography>
        </div>
    );
}

export default React.memo(VentureInfo);
