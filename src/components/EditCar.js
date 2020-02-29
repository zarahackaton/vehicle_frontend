import React, {Component} from 'react';
import axios from 'axios';
import Rodal from 'rodal';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import FilledInput from '@material-ui/core/FilledInput';
import CarIcon from '@material-ui/icons/DriveEta';

/*
 * This component is in charge of the edit car functionality.
 */
class EditCar extends Component {
    constructor(props) {
        super(props);
        this.nameRef = React.createRef();

        this.state = {
            visible: true,
            types: ['SUV', 'Truck', 'Hybrid'],
            carName: '',
            chosenType: ''
        };
    }

    /*
     * Inform ViewCar component about closing the modal.
     */
    hide = () => {
        this.props.visible();
    };

    /*
     * Handle BackEnd request to edit a specific car.
     */
    editCar = async (event) => {
        event.preventDefault();
        const carName = this.nameRef.current.value;
        const carType = this.state.chosenType ? this.state.chosenType : this.props.car.type;
        const data = {
            name: carName,
            type: carType
        };
        try {
            const result = await axios.put(`http://localhost/edit_car/${this.props.car._id}`, data);
            this.props.fetchData();
            toast.success('Car edited successfully!');
        }
        catch (error) {
            toast.error('Failed editing a car');
        }
        this.hide();
    };

    /*
     * Update the car type upon change.
     */
    onCarTypeChange = (event) => {
        this.setState({chosenType: event.target.value});
    };

    /*
     * Render relevant option from the options list.
     */
    showType = (type, index) => {
        return (
            <option key={index} value={type}>{type}</option>
        );
    };

    render() {
        const rodalStyle = {height: '45vh'};
        return (
            <Rodal visible={this.state.visible}
                   onClose={this.hide}
                   animation="zoom"
                   customStyles={rodalStyle}>
                <h1>Details</h1>
                <form onSubmit={this.editCar} className="font-weight-bold">
                    <p className="h5 mt-3">Car Name</p>
                    <TextField inputRef={this.nameRef}
                               defaultValue={this.props.car.name}
                               variant="outlined"
                               fullWidth
                               required
                               InputProps={{
                                   startAdornment: (
                                       <InputAdornment position="start">
                                           <CarIcon/>
                                       </InputAdornment>
                                   )
                               }}/>
                    <p className="h5 mt-2">Car Type</p>
                    <Select
                        native
                        required
                        value={this.state.chosenType ? this.state.chosenType : this.props.car.type}
                        onChange={this.onCarTypeChange}
                        input={<FilledInput name="Select"/>}
                    >
                        /*
                         * Iterate over all options and render them.
                         */
                        {this.state.types.map(this.showType)}
                    </Select>
                    <div className="mt-4">
                        <Button type="submit" size="large" variant="contained" className="capitalizeText">Edit Car</Button>
                    </div>
                </form>
            </Rodal>
        );
    }
}

export default EditCar;