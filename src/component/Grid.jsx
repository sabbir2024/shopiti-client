
const Grid = ({ children }) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-4">
            {children}
        </div>
    );
};

export default Grid;