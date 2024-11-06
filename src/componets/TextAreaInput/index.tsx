import * as stylex from '@stylexjs/stylex';


type Props = {
    label: string;
    value: string;
    onChangeText: (newValue: string) => void;
}


const TextAreaInput = ({ label, value, onChangeText }: Props) => {
    return (
        <div  {...stylex.props(styles.inputContainer)} >
            <p {...stylex.props(styles.label)}>
                {label}
            </p>
            <textarea rows={5} wrap='soft'
                value={value}
                {...stylex.props(styles.input)}
                placeholder={`Enter ${label.toLowerCase()} here`}
                onChange={(event) => onChangeText(event.target.value)}
            />
        </div>
    );
};

export default TextAreaInput;

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