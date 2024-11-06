import { useState, useEffect } from 'react'
import * as stylex from '@stylexjs/stylex';


type Props = {
    value: string;
    onSelect: (id: string) => void;
}

export default function ProjectName({ onSelect, value }: Props) {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        fetch('http://172.16.40.130:8080/api/projects',)
            .then(response => response.json())
            .then(data => {
                setProjects(data)
            })
            .catch(error => console.error(error));
    }, [])
    const handleSelectChange = (event: any) => {
        onSelect(event.target.value)
    };

    return (
        <div  {...stylex.props(styles.dropdownContainer)}>
            <p {...stylex.props(styles.label)}>Project Name</p>
            <select
                value={value}
                onChange={handleSelectChange}
                {...stylex.props(styles.dropdown)}
            >
                <option key={"select-project"} {...stylex.props(styles.option)} value={""}>Select Project</option>
                {projects.map((one: any) => (
                    <option key={one.name} {...stylex.props(styles.option)} value={one.id}>{one.name}</option>
                ))}

            </select>
        </div>

    );
}


const styles = stylex.create({
    dropdownContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '10px 16px',
        width: '50vw'
    },
    label: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#333',
    },
    dropdown: {
        width: '20vw',
        padding: '8px',
        fontSize: '16px',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    option: {
        padding: '10px',
        fontSize: '16px',
    }
});