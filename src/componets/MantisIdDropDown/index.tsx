import { useState, useEffect } from 'react'
import * as stylex from '@stylexjs/stylex';

type Props = {
    projectId: string;
    value: string;
    onSelect: (newValue: string) => void;
}

export default function MantisIdDropDown({ projectId, value, onSelect }: Props) {
    const [mantisIds, setMantisIds] = useState([])

    useEffect(() => {
        if (projectId) {
            fetch(`http://172.16.40.130:8080/api/mantis/${projectId}`,)
                .then(response => response.json())
                .then(data => {
                    setMantisIds(data)
                })
                .catch(error => console.error(error));
        }

    }, [projectId])
    const handleSelectChange = (event: any) => {
        onSelect(event.target.value);
    };

    return (
        <div  {...stylex.props(styles.dropdownContainer)}>
            <p {...stylex.props(styles.label)}>MantisId</p>
            <select
                value={value}
                onChange={handleSelectChange}
                {...stylex.props(styles.dropdown)}
            >
                <option key={"select-mantis-id"} {...stylex.props(styles.option)} value={""}>Select Mantis Id</option>
                {mantisIds.map((one: any) => (
                    <option key={one.mantisId} {...stylex.props(styles.option)} value={one.mantisId}>{one.mantisId}</option>
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