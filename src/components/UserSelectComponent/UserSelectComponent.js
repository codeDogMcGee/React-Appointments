import { useState } from 'react';


const UserSelectComponent = ({ selectList, setSelectValue }) => {   
    // const [selectValues, setSelectValues] = useState([{id:-1, name:""}]);
    const [selectItem, setSelectItem] = useState({});

    const selectOnChange = (e) => {

        setSelectItem(e.target.value)

        var person = selectList.find(person => person.id.toString() === e.target.value)
        person ? setSelectValue(person) : setSelectValue({})
    };

    const blankUser = {id:-1, name:""};
    const selectValues = [blankUser, ...selectList]

    return (
        <select
            value={selectItem.id} 
            onChange={selectOnChange}
        >
            { selectValues.map((user, i) => {
                return <option key={i} value={user.id}>{user.name}</option>
            })}
        </select>
    );
};

    

export default UserSelectComponent;