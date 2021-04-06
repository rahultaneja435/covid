// import React, {useEffect, useState } from 'react'
// import { Line } from 'react-chartjs-2';
// import numeral from "numeral"

// function Struct({caseType="cases"}) {

//     const options={
//         legend:{
//             display:false
//         },
//         elements:{
//             point:{
//                 radius:0
//             }
//         },
//         maintainAspectRatio:false,
//         tooltips:
//         {
//             mode:"index",
//             intersect:false,
//             callbacks:{
//                 label: function (tooltipItem, data) {
//                     return numeral(tooltipItem.value).format("+0,0")
//                 }
//             }
//         },
//         scales: {
//           xAxes:[{
//             type:"time",
//             time:{
//                 format:"MM/DD/YY",
//                 tooltipFormat : "ll"
//             }
//         }
//           ],
//           yAxes:[{
//               gridLines:{
//                   display:false
//               },
//               ticks: {
//                   callback:function(value,index,values)
//                   {
//                       return numeral(value).format("0a");
//                   }
//               }
//           }]
//         }
//     }
//     const [graphData,serGraphData] = useState({});
//     const buildData = (data,caseType="cases")=>
//     {
//         const charData =[];
//         let lastPoint;
//         for(let date in data.cases)
//         {
//             if(lastPoint)
//             {
//             const newData ={
//                 x:date,
//                 y:data[caseType][date] - lastPoint
//             }
//           charData.push(newData);  
//         }
//         lastPoint= data[caseType][date];
//         }
//         return charData;
//     };
//     useEffect(()=>
//     {
//         const fectData= async()=>{
//            await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
//             .then(response=>response.json())
//             .then(data=>
//              {
//                  console.log(data);
//                  let graphResponse = buildData(data,caseType);
//                  serGraphData(graphResponse);
//              })
//         }
//        fectData();
//     },[caseType]);
  
//     return (
//         <div>
//            {graphData?.length > 0 && (  <Line data={{
//                options:{options},
//                datasets:[{
//                 backgroundColor:"rgb(204,16,52,0.5)",
//                 borderColor:"#CC1034",
//                 data:graphData
//                }]
//            }}/>)}
         
//         </div>
//     )
// }

// export default Struct
