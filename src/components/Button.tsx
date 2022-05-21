interface ButtonProps {
    nameClass: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({nameClass, onClick}) => {

    return (
        <button className="button is-small is-primary" onClick={()=> onClick()}>
            <span className="icon">
                <i className={`fas ${nameClass}`}></i>
            </span>
        </button>
    );
};

export default Button;