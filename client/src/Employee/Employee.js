import React, {Component} from 'react';
import axios from 'axios';

class Employee extends Component{
    constructor() {
        super();
        this.state = {
          Name:'',
          EmpCode:'',
          Salary:'',
          employees: [],
          isLoaded: false
        };
      }

    //Put methods here
    async componentDidMount(){
        try{
            //axios build in json()
            const res = await axios.get(`/employees`);
            console.log(res.data);
            this.setState(
                {
                    employees:res.data,
                    isLoaded:true,
                }  
            )
        }catch(err){
            console.log(`Got error when fetching data,the error is ${err}`)
        }
    }
    //async deleteEmployee(EmpID){}
    deleteEmployee = async(EmpID) =>{
        try{
            await axios.delete(`/employees/${EmpID}`);
            const res = await axios.get(`/employees`);
            this.setState(
                {
                    employees:res.data,
                }  
            )
        }catch(err){
            console.log(`Delete action failed`)
        }
    }

    handleChange = event => {
        console.log(event.target.name, event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    addEmployee = async(event) =>{
        event.preventDefault();
        const {EmpCode, Salary, Name} = this.state;
        try{
            await axios.post(`/employees`,{
                EmpCode:EmpCode,
                Salary:Salary,
                Name:Name,
            });
            const res = await axios.get(`/employees`);
            this.setState(
                {
                    employees:res.data,
                    Name:'',
                    EmpCode:'',
                    Salary:'',
                }  
            )
        }catch(err){
            console.log(`Add action failed`)
        }
    }



    render(){
        return this.state.isLoaded ? (
            <div>
            <table>
              <tbody>
              <tr>
                <th>EmpId</th>
                <th>Name</th>
                <th>EmpCode</th>
                <th>Salary</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
              {this.state.employees.map((el, index) => {
              return (
              <tr key = {index}>
                    <th>{el.EmpID}</th>
                    <th>{el.Name}</th>
                    <th>{el.EmpCode}</th>
                    <th>{el.Salary}</th>
                    <th><button type = 'button' onClick = {() => this.deleteEmployee(el.EmpID)}>Delete</button></th>
                    <th><button type = 'button'>Edit</button></th>
              </tr>
              )
            })}
            </tbody>
              </table>
              <form onSubmit={this.addEmployee}>
                    Name:
                    <input
                    type="text"
                    name="Name"
                    placeholder="Input Name"
                    value = {this.state.Name}
                    onChange = {this.handleChange}
                    />
                    EmpCode:
                    <input
                    type="number"
                    name="EmpCode"
                    placeholder="Input EmpCode"
                    value = {this.state.EmpCode}
                    onChange = {this.handleChange}
                    />
                    Salary:
                    <input
                    type="number"
                    name="Salary"
                    placeholder="Input Salary"
                    value = {this.state.Salary}
                    onChange = {this.handleChange}
                    />
                <button type="submit">submit</button>
                </form>

              </div>
        ) : (
          <div>Loading...</div>
        );
      }
}

export default Employee;