
import React, {
  lazy,
  useReducer,
  useRef,
  useState,
  useEffect,
  Link
} from "react";

import {
  CButton,
  CRow,
} from "@coreui/react";




const Dashboard = () => {
  const reducer = (_, { data }) => data;

  return (
    <>
      <CRow>
        <CButton color='danger'
          style={{ left: '150px' }}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = 'http://localhost:3000/charts#/charts';
          }}
        >
          Play Game
        </CButton>
      </CRow>
    </>
  );
};

export default Dashboard;
