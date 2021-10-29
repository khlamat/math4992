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
          onChange={(value) => {
            setHeuristic(value);
          }}
        >
          <Option value="manHattan">ManHattan distance</Option>
          <Option value="custom">Custom</Option>
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
