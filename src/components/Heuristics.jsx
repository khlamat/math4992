import React from "react";
import { Select, Row } from "antd";

const { Option } = Select;
const Heuristics = ({ heuristic, setHeuristic }) => {
  return (
    <>
      <Row>Heuristic function:</Row>
      <Row>
        <Select
          style={styles.selectStyle}
          value={heuristic}
          onChange={(value,op) => {
            setHeuristic(value);
          }}
        >
          <Option value="manHattan">ManHattan distance</Option>
          <Option value="linearConflict">Linear Conflict</Option>
          <Option value="closureConflict">Closure Conflict</Option>
          <Option value="maxConflict">Max Conflict</Option>
          <Option value="mergeConflict">Merge Conflict</Option>
        </Select>
      </Row>
    </>
  );
};

const styles = {
  selectStyle: {
    width: "200px",
  },
};
export default Heuristics;
