interface Props {

}

const TableInfo = (props: Props) => {
  const {} = props;

  return (
    <div className="table-info">
      <table className="border-collapse">
        <thead>
          <tr>
            <th></th>
            <th>Stake</th>
            <th>Bond</th>
            <th>Sell</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Stake</td>
            <td>(3,3)</td>
            <td>(1,3)</td>
            <td>(-1,1)</td>
          </tr>
          <tr>
            <td>Bond</td>
            <td>(3,1)</td>
            <td>(1,1)</td>
            <td>(-1,1)</td>
          </tr>
          <tr>
            <td>Sell</td>
            <td>(1,-1)</td>
            <td>(1,-1)</td>
            <td>(-3,-3)</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableInfo;
