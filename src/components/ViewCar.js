import React, {Component} from 'react';
import axios from 'axios';
import EditCar from './EditCar';
import Button from '@material-ui/core/Button';
import Rodal from 'rodal';
import {toast} from "react-toastify";

/*
 * This component is in charge of the view car functionality.
 */
class ViewCar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            editVisible: false
        };
    }

    /*
     * Inform Inventory component about closing the modal.
     */
    hide = () => {
        this.props.visible();
    };

    /*
     * Handle BackEnd request to delete a specific car.
     */
    deleteCar = async () => {
        try {
            const result = await axios.delete(`http://localhost/delete_car/${this.props.car._id}`);
            this.props.fetchData();
            toast.success('Car deleted successfully!');
        }
        catch (error) {
            toast.error('Failed deleting a car');
        }
        this.hide();
    };

    /*
     * Handle the boolean that determines edit car modal rendering.
     */
    showEditCar = () => {
        this.setState({editVisible: true});
    };

    render() {
        return (
            !this.state.editVisible ?
                <Rodal visible={this.state.visible}
                       onClose={this.hide}
                       animation="zoom">
                    <h1>Details</h1>
                    <>
                        <p className="h6">Car Name: {this.props.car.name}</p>
                        <p className="h6">Car Type: {this.props.car.type}</p>
                        <p className="h6">Time Created: {this.props.car.time_created}</p>
                        {this.props.car.last_update &&
                        <p className="h6">Last Update: {this.props.car.last_update}</p>
                        }
                        <div className="mt-3 justify-content-center">
                            <Button type="submit"
                                    size="large"
                                    variant="contained"
                                    className="capitalizeText"
                                    onClick={this.showEditCar}
                            >
                                Edit
                            </Button>
                            <Button type="submit"
                                    size="large"
                                    variant="contained"
                                    className="capitalizeText"
                                    onClick={this.deleteCar}
                            >
                                Delete
                            </Button>
                        </div>
                    </>
                </Rodal>
                :
                <EditCar visible={this.props.visible} car={this.props.car} fetchData={this.props.fetchData}/>
        );
    }
}

export default ViewCar;