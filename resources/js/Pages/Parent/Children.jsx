import './layout.css'
import { Link, useForm, usePage } from '@inertiajs/react';
import ParentLayout from './Partials/ParentLayout.jsx';

const ChildrenItem = ({item}) => {

    return <div className={"border px-2 py-2 rounded-md text-sm space-y-4"}>
        <p className={"text-lg font-semibold text-gray-700 mb-3"}>Child Overview</p>
        <div className={"space-y-2"}>
            <p>Name: {item.name}</p>
            <p>Age: {item.age} years old</p>
            <p>Height: {item.latest_record?.height} cm</p>
            <p>Weight: {item.latest_record?.weight} kg</p>
            <p>Gender: {item.gender}</p>
            <p>Birthdate: {item.birth_date}</p>
        </div>

        <p className={"text-lg font-semibold text-gray-700 mb-3"}>Indicators</p>

        <div className={"space-y-2"}>
            <p>BMI: {item.latest_record?.bmi}</p>
        </div>

        <p className={"text-lg font-semibold text-gray-700 mb-3"}>Programs</p>
        {
            item.enrolled_programs?.length ?
                <ul className={"space-y-2 list-disc"}>
                    {item.enrolled_programs.map(program => <li className="ml-5" key={`${item.id}-program-${program.id}`}>
                        <p>{program.title}</p>
                    </li>)}
                </ul> :
                <p>No Programs</p>
        }
    </div>
}


const Children = ({children}) => {
    const page = usePage()
    const {user} = page.props.auth;

    return (<ParentLayout>
        <div>
            <h2 className={"text-lg font-semibold mb-5"}>My Children</h2>

            <div className={"space-y-6"}>
                {children.map(item => <ChildrenItem key={item.id} item={item}/>)}
            </div>
        </div>
    </ParentLayout>)
}

export default Children
