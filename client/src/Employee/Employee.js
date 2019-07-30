import React, {Component} from 'react';
import axios from 'axios';

class Employee extends Component{
    constructor() {
        super();
        this.state = {
          EmpID: 0,
          Name:'',
          EmpCode:'',
          Salary:'',
          employees: [],
          pressArr :[],
          isEditing:false,
          isLoaded: false,
        };
      }

    //Put methods here
    async componentDidMount(){
        try{
            //axios build in json()
            const res = await axios.get(`/employees`);
            //console.log(res.data);
            let arr = new Array(res.data.length).fill(false);
            //console.log(pressArr)
            this.setState(
                {
                    employees:res.data,
                    pressArr:arr,
                    isLoaded:true,
                }  
            )
        }catch(err){
            console.log(`Got error when fetching data,the error is ${err}`)
        }
    }

    editEmployee = async(index, EmpID,name,empCode,salary) =>{
        if(this.state.isEditing){
            let {EmpCode, Salary, Name} = this.state;
            if(EmpCode === '') EmpCode = empCode;
            if(Name === '') Name = name;
            if(Salary === '') Salary = salary;
            try{
                await axios.put(`/employees`,{
                    EmpID:EmpID,
                    EmpCode:EmpCode,
                    Salary:Salary,
                    Name:Name,
                });
                const res = await axios.get(`/employees`);
                let value = !this.state.pressArr[index]
                this.setState(
                    {
                        employees:res.data,
                        isEditing: false,
                        pressArr:[...this.state.pressArr.slice(0, index), value, ...this.state.pressArr.slice(index + 1)],
                        EmpID:0,
                        Name:'',
                        EmpCode:'',
                        Salary:'',
                    }  
                )
            }catch(err){
                console.log(`Add action failed`)
            }
        }
        else{
            let value = !this.state.pressArr[index]
            this.setState({
                pressArr:[...this.state.pressArr.slice(0, index), value, ...this.state.pressArr.slice(index + 1)],
                isEditing: true,
                Name:'',
                EmpCode:'',
                Salary:'',
            })
        }
    }

    editCurrentTask = (event) =>{
        console.log(event.target.name, event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
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

    handleChangeAtAdd = event => {
        console.log(event.target.name, event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        });
    };



    render(){
        //console.log(this.state.Name)
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
                    this.state.isEditing
                    ?
                    (
                        this.state.pressArr[index]
                        ?
                        (
                            <tr key = {index}>
                            <th>{el.EmpID}</th>
                            <th>
                                <input
                                type="text"
                                defaultValue={el.Name}
                                name = 'Name'
                                onChange={e => this.editCurrentTask(e)}
                            />
                            </th>
                            <th>
                                <input
                                type="text"
                                defaultValue={el.EmpCode}
                                name = 'EmpCode'
                                onChange={e => this.editCurrentTask(e)}
                            />
                            </th>
                            <th>
                                <input
                                type="text"
                                defaultValue={el.Salary}
                                name = 'Salary'
                                onChange={e => this.editCurrentTask(e)}
                            />
                            </th>
                            <th><button type = 'button' disabled >Delete</button></th>
                            <th><button type = 'button' onClick={()=>this.editEmployee(index,el.EmpID,el.Name, el.EmpCode, el.Salary)}>Done</button></th>
                            </tr>
                        )
                        :
                        (
                            <tr key = {index}>
                            <th>{el.EmpID}</th>
                            <th>{el.Name}</th>
                            <th>{el.EmpCode}</th>
                            <th>{el.Salary}</th>
                            <th><button type = 'button' disabled >Delete</button></th>
                            <th><button type = 'button' disabled >Edit</button></th>
                            </tr>
                        )
                    )
                    :
                    (
                    <tr key = {index}>
                        <th>{el.EmpID}</th>
                        <th>{el.Name}</th>
                        <th>{el.EmpCode}</th>
                        <th>{el.Salary}</th>
                        <th><button type = 'button' onClick = {() => this.deleteEmployee(el.EmpID)}>Delete</button></th>
                        <th><button type = 'button' onClick={()=>this.editEmployee(index,el.EmpID)}>Edit</button></th>
                    </tr>
                    )  
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
                    onChange = {this.handleChangeAtAdd}
                    />
                    EmpCode:
                    <input
                    type="number"
                    name="EmpCode"
                    placeholder="Input EmpCode"
                    value = {this.state.EmpCode}
                    onChange = {this.handleChangeAtAdd}
                    />
                    Salary:
                    <input
                    type="number"
                    name="Salary"
                    placeholder="Input Salary"
                    value = {this.state.Salary}
                    onChange = {this.handleChangeAtAdd}
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