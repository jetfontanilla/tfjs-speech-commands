import style from "./style.css";

const Grid = ({size}) => {
    const grid = new Array(size).fill(undefined).map(() => new Array(size).fill(undefined));
    return (
        <div>
            {
                grid.map((row, y) => {
                    return (<div>
                        {row.map((col, x) => {
                            return <span class={style.grid}>{x}, {y}</span>;
                        })}
                    </div>);
                })
            }
        </div>
    );
};

export default Grid;
