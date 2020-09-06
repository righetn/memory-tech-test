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
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: data.chart_data.month_revenue
      }
    ]
  };

  return (
      <div>
        <div className="head">Memory</div>

        <div className="flex-container">
          <p>Country</p>
          <select className="contry-selector" defaultValue={currentCountry} onChange={e => setCurrentCountry(e.target.value)}>
              {countries.map((country, index) => {
                  return <option key={index} value={country}>{country}</option>
              })}
          </select>
        </div>

        <div className="flex-container">
          <p>Summary</p>
          <Info title="Revenue" value={data.total_revenue}/>
          <Info title="Average" value={data.average}/>
          <Info title="Customer" value={data.customer_number}/>
        </div>

        <Bar
          data={dataChart}
        />
      </div>
  );
}

export default Dashboard
