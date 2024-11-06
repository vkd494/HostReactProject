import * as stylex from '@stylexjs/stylex';

type Props = {
    label: string
}


const InputField = ({ label }: Props) => {
    return (
        <div  {...stylex.props(styles.inputContainer)} >
            <p {...stylex.props(styles.label)}>
                {label}
            </p>
            <input
                {...stylex.props(styles.input)}
                type="text"
                id="name"
                name="name"
                placeholder={`Enter ${label}`}
            />
        </div>
    );
};

export default InputField;

const styles = stylex.create({
    label: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#333',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '20vw',
        boxSizing: 'border-box',
        background: '#fff'
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '10px 16px',
        width: '50vw'
    },
});