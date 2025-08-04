const Table = ({ columns = [], data = [], children }) => {
    if (!Array.isArray(columns) || !Array.isArray(data)) {
      return <div>No data to display</div>;
    }
  
    return (
      <table>
        <thead>
          <tr>
            {columns.map((col, i) => <th key={i}>{col}</th>)}
            {children ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => <td key={col}>{row[col]}</td>)}
              {children && <td>{children(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table;