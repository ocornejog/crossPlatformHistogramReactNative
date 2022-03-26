import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StatusBar, Dimensions, Text, StyleSheet, View } from 'react-native';
//import ScrollableTabView from 'react-native-scrollable-tab-view';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph } from 'react-native-chart-kit';
import { data, contributionData, pieChartData, progressChartData } from '../constants/data';
//import 'babel-polyfill';
import Constants from 'expo-constants';
import C from '../constants/mainColors';
import { Card } from 'react-native-paper';
import FontStyles from '../constants/mainTextFormats';
import CheckButton2 from './CheckButton2';

const width = (Dimensions.get('window').width)/2;
const height = 220;

const Histogram3 = props => {
//-----------------------------------------------------------
// Hooks for the attributes
  const [items, setItems] = useState([]);
  const [labelsList, setLabelsList] = useState([]);
  const [colorGradient, setColorGradient] = useState(`0, 51, 181`);
//-----------------------------------------------------------
const gettingDate = (date) => {
  const dateFormat = new Date(date);
  const weekDay = dateFormat.getDay();
  const month = dateFormat.getMonth();
  const dayOfTheMonth = dateFormat.getDate();
  const year = dateFormat.getFullYear();
  return `${dayOfTheMonth}/${month+1}/${year}`
};
const gettingTime = (date) => {
  const time = `${new Date(date).getHours()<10?'0':''}${new Date(date).getHours()}:${new Date(date).getMinutes()<10?'0':''}${new Date(date).getMinutes()}`;
  return time
};
useEffect(()=>{
  console.log(items);
},[items]);
useEffect(()=>{
  console.log(labelsList);
},[labelsList]);
useEffect(()=>{
  var i = 0;
  var j = 0;
  var dataItem = {};
  var dataSet = [];
  while (i < 4){
    if(props.selectionVector[i] === true){
      var k = 0;
      var data = Array(props.datasets.length).fill(0);
      while(k < props.datasets.length){
        if(i === 0){
          if(props.datasets[k].averageValue === null) {
            data[k] = 0;
          }
          else{
            data[k] = props.datasets[k].averageValue;
          }
        }
        if(i === 1){
          if(props.datasets[k].standardDeviation === null){
            data[k] = 0;
          }
          else{
            data[k] = props.datasets[k].standardDeviation;
          }
        }
        if(i === 2){
          if(props.datasets[k].percentile5th === null){
            data[k] = 0;
          }
          else{
            data[k] = props.datasets[k].percentile5th;
          }
        }
        if(i === 3){
          if(props.datasets[k].percentile95th === null){
            data[k] = 0;
          }
          else{
            data[k] = props.datasets[k].percentile95th;
          } 
        }
        k++;
      }
      if(i === 0){
        dataItem = {data: data};
        setColorGradient('0, 51, 181');
      }
      if(i === 1){
        dataItem = {data: data, color: (opacity = 1) => `rgba(227, 6, 19, ${opacity})` };
        setColorGradient('227, 6, 19');
      }
      if(i === 2){
        dataItem = {data: data, color: (opacity = 1) => `rgba(0, 133, 0, ${opacity})` };
        setColorGradient('0, 133, 0');
      }
      if(i === 3){
        dataItem = {data: data, color: (opacity = 1) => `rgba(255, 122, 71, ${opacity})` };
        setColorGradient('255, 122, 71');
      }
      dataSet[j] = dataItem;
      j++;
    }
    i++;
  };
  setItems(dataSet);
},[props.selectionVector]);
useEffect(()=>{
  var l = 0;
  var labelsVector = Array(props.labels.length).fill('');
  while (l < props.labels.length){
    console.log(props.labels[l].label);
    labelsVector[l] = props.labels[l].label;
    l++;
  }
  setLabelsList(labelsVector);
},[props.labels])
const chartConfigs = [
  {
    backgroundColor: C.whitePrimary,
    backgroundGradientFrom: C.whitePrimary,
    backgroundGradientTo: C.whitePrimary,
    color: (opacity = 1) => `rgba(${colorGradient}, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 51, 181, ${opacity})`,
    style: {
      borderRadius: 10
    }
  }
]
//-----------------------------------------------------------
// Rendering the component ...
  return (
    <View style={{width: props.width, alignItems: 'center', justifyContent: 'center'}}>
        {chartConfigs.map(chartConfig => {
          return (
            <ScrollView
              key={Math.random()}
              style={{
                backgroundColor: chartConfig.backgroundColor
              }}
            >
              <Text style={[styles.labelStyle, FontStyles.body, {color: `rgba(0, 51, 181, 1)`}]}>{`${gettingDate(props.startDate)} ${gettingTime(props.startDate)} - ${gettingDate(props.endDate)} ${gettingTime(props.endDate)}`}</Text>
              {((items.length !== 0)&&(labelsList.length !== 0))&&
              <LineChart
                data={{
                    labels: labelsList,
                    datasets: items
                }}
                width={props.width}
                height={props.height}
                chartConfig={chartConfig}
                style={{...chartConfig.style, marginVertical: 8}}
              />
              }
              <View style={{height: 48}}></View>
            </ScrollView>
          )
        })}
    </View>
  );
}
export default Histogram3;
//-------------------------------------------------------------------------
Histogram3.defaultProps = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            data: [50, 20, 2, 86, 71, 100],
            color: (opacity = 1) => `rgba(227, 6, 19, ${opacity})` // optional
        },
        {
            data: [20, 10, 4, 56, 87, 90]
        }
    ]
};
//-------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  labelStyle: {
    //color: chartConfig.color(),
    marginVertical: 6,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
});