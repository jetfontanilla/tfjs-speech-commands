import style from "./style.css";
const cx = require("classnames");

const Grid = ({size, position}) => {
    const grid = new Array(size).fill(undefined).map(() => new Array(size).fill(undefined));
    const [positionX, positionY] = position;

    return (
        <div>
            {
                grid.map((row, y) => {
                    return (<div>
                        {row.map((col, x) => {
                            const activeClass = x === positionX && y === positionY ? style.active : "";
                            const classnames = cx(style.grid, activeClass)
                            return <span class={classnames}>{x}, {y}</span>;
                        })}
                    </div>);
                })
            }
        </div>
    );
};

export default Grid;
