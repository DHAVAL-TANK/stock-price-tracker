import React from 'react';
import Plot from 'react-plotly.js';

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
      symbol:"RELIANCE.BSE"
    }
  }

  componentDidMount() {
    this.fetchStock("RELIANCE.BSE");
  }

  fetchStock(symbol) {
    const pointerToThis = this;
    const API_KEY = '9OZJOS9GDC3EQPLJ';
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];
    fetch(API_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
          if(data.Note) {
            alert(data.Note)
          }
          for (var key in data['Time Series (Daily)']) {
            stockChartXValuesFunction.push(key);
            stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
          }
          pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            stockChartYValues: stockChartYValuesFunction
          });
        }
      )
  }

  render() {
    
    return (
      <div>
        <h2>Stock Market Price ( in USD )
           <select  value={this.state.symbol} onChange={(event)=>
           { this.setState({ symbol: event.target.value})
           this.fetchStock(event.target.value)
           return;
          }
          }  style={{margin:20,padding:10}}>
          <option value='RELIANCE.BSE'>Reliance</option>
          <option value='IBM'>IBM</option>
          <option value='TSLA'>Tesla</option>
          <option value='GOOGL'>Google</option>
          <option value='AMZN'>Amazon</option>
        </select></h2>
       
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
          layout={{width: 1200, height: 550, title: 'A Fancy Plot  '}}
        />
      </div>
    )
  }
}

export default Stock;
