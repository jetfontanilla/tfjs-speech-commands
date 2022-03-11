const Grid = ({size}) => {
    const grid = new Array(size).fill(undefined).map(() => new Array(size).fill(undefined));
    return (
        <div class="grid">
            {
                grid.map((row, y) => {
                    return (<div>
                        {row.map((col, x) => {
                            return <span>{x}, {y}</span>;
                        })}
                    </div>);
                })
            }
        </div>
    );
};

export default Grid;
