import {useState} from "react";

export default function PlannerList({onAdd}) {
    const [workName, setWorkName] = useState('');
    function handleSubmit(ev) {
        ev.preventDefault();
        onAdd(workName);
        setWorkName('');
      }

      return(
        <form onSubmit={handleSubmit}>
            <button>+</button>
            <input type="text"
                value={workName}
                onChange={ev => setWorkName(ev.target.value)}
                placeholder="Plan Your Task....."/>
        </form>
      );
}