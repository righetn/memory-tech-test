import React, { useState, useEffect } from "react"
// import PropTypes from "prop-types"
import { Bar } from 'react-chartjs-2'
import Info from "./Info"
import "./Dashboard.scss"

const Dashboard = ({countries}) => {
  const [currentCountry, setCurrentCountry] = useState(countries[0])
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      fetch(`/dashboard/infos?country=${currentCountry}`, { method: "GET" })
        .then((response) => response.json())
        .then((result) => {
          setData(result)
        })
      }
    fetchData()
  }, [currentCountry])

  if (!data) return null

  const dataChart = {
    labels: data.chart_data.month_date,
    datasets: [
      {
        label: "Monthly revenue",
        backgroundColor: '#DF7168',
        borderColor: '#8C271E',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: data.chart_data.month_revenue
      }
    ]
  };

  return (
      <div>
        <div className="header-container">
          <h1 className="header">Memory</h1>
        </div>

        <div className="country-container">
          <h3 className="title">Country</h3>
          <select className="contry-selector" defaultValue={currentCountry} onChange={e => setCurrentCountry(e.target.value)}>
              {countries.map((country, index) => {
                  return <option key={index} value={country}>{country}</option>
              })}
          </select>
        </div>
        
        <div className="summary-container">
          <h3 className="title">Summary</h3>
          <div className="infos-container">
            <Info title="Revenue" value={data.total_revenue}/>
            <Info title="Average" value={data.average}/>
            <Info title="Customer" value={data.customer_number}/>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart">
            <Bar data={dataChart}/>
          </div>
        </div>
      </div>
  );
}

export default Dashboard
