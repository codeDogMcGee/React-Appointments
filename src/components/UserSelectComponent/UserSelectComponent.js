import { useState, useEffect } from 'react';


const UserSelectComponent = ({ selectList, setSelectValue, selectedValue }) => {   
    const [selectValues, setSelectValues] = useState([{id:-1, name:""}]);
    const [selectItem, setSelectItem] = useState({});

    const selectOnChange = (e) => {
        var person = selectList.find(person => person.id.toString() === e.target.value)
        person ? setSelectValue(person) : setSelectValue({})
    };

    // useEffect(() => {
    //     if (selectValues.length === 1){  // default selectValues has one item
    //         setSelectValues([...selectValues, ...selectList]);
    //     }

    //     // if (selectedValue) setSelectItem(selectedValue);
    // }, [selectList, selectValues]);

    useEffect(() => {
        if (selectValues.length === 1){  // default selectValues has one item
            setSelectValues([...selectValues, ...selectList]);
        }

        if (selectedValue) setSelectItem(selectedValue);
    }, [selectedValue, selectValues, selectList]);
    // setSelectItem(selectedValue);

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