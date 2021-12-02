import "../styles/Skeleton.css";

function Skeleton({large}){

    return (
        <div className={large? "large_skeleten":"small_skeleten"}>
            <div className="skeleten_div"></div>
            <div className="skeleten_div"></div>
            <div className="skeleten_div"></div>
            <div className="skeleten_div"></div>
        </div>
    );
}

export default Skeleton;