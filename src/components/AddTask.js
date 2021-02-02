import { useState } from 'react';

export default function AddTask({ onAdd }) {
    // Component Level State
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmitHandle = (e) => {
        e.preventDefault();

        if(!text) {
            alert('Please Add Task!');
            return;
        }

        onAdd({ text, day, reminder });

        setText('');
        setDay('');
        setReminder(false);
    };

    return (
        <form className='add-form' onSubmit={onSubmitHandle}>

            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task' value={text} onChange={e => setText(e.target.value)}/>
            </div>
            <div className='form-control form-control-check'>
                <label>Day and Time</label>
                <input type='text' placeholder='Add Day & Time'  value={day} onChange={e => setDay(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Set Reminder</label>
                <input type='checkbox' checked={reminder} value={reminder} onChange={e => setReminder(e.currentTarget.checked)} />
            </div>

            <input type='submit' value='Save Task' className='btn btn-block' />
        </form>
    )
}
