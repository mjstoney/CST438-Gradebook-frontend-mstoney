import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';

class InstructorAddAssignment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assignmentName: '',
            dueDate: '',
            courseID: null
        }
    }
    assignmentNameChangeHandler = (e) => {
        this.setState((state) => {
            return { assignmentName: e.target.value }
        });
    }

    assignmentDueDateChangeHandler = (e) => {
        this.setState((state) => {
            return { dueDate: e.target.value }
        });
    }

    assignmentCourseChangeHandler = (e) => {
        this.setState((state) => {
            return { courseID: e.target.value }
        });
    }    

    submitButtonHandler = (e) => {
        // PreventDefault prevents reloading the page on submit
        e.preventDefault();
        const token = Cookies.get('XSRF-TOKEN');
        const { assignmentName, dueDate, courseID} = this.state;
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': token
            },
            body: JSON.stringify({
                assignmentName: assignmentName,
                dueDate: dueDate,
                courseID: courseID
            })
        }
        console.log(requestOptions.body)
        fetch(`http://localhost:8081/assignment?assignmentName=${assignmentName}&dueDate=${dueDate}&courseID=${courseID}`, requestOptions)

    }

    render() {
        return (
            <>
            {/**Add css to make  this look nicer */}
                <h3 style={{width: 500}}>Add Assignment</h3>
                <div id="instructor-add-assignment" style={{ height:200, width: 500, display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
                <form onSubmit={this.submitButtonHandler}>
                    <table>
                        <tbody>
                        <tr>
                            <td><label htmlFor="assignmentName">Assignment Name: </label></td>
                            <td><input type='text' name='assignmentName' onChange={this.assignmentNameChangeHandler}></input></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="assignmentDueDate">Due Date: </label></td>
                            <td><input type='date' name='assignmentDueDate' onChange={this.assignmentDueDateChangeHandler}></input></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="assignmentCourse">Course ID: </label></td>
                            <td><input type='number' name='assignmentCourse' onChange={this.assignmentCourseChangeHandler}></input></td>

                        </tr>
                        <tr>
                            <td>
                                <Button type='submit' value='Submit' variant="outlined" color="primary" style={{margin: 10}}>Add</Button>
                            </td>
                            <td>
                                <Button variant="outlined" color="primary" style={{margin: 10}}><Link to='assignment' style={{textDecoration: 'none'}}>Cancel</Link></Button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </form>

                </div>
                {/**add POST request to localhost:8081(?)/assignment to button */}
                </>
        )
    }
}

InstructorAddAssignment.defaultProps = {
    assignmentName: '',
    dueDate: '',
    courseID: null
}

export default InstructorAddAssignment;