import React from 'react';
import Clock from 'react-live-clock';
import gql from 'graphql-tag';



import '../App.css';
import "@fontsource/ibm-plex-mono";
import "@fontsource/ibm-plex-sans";
import { useGQLQuery } from "./GetBuses";
import moment from 'moment';

const GET_BUSSES = gql`
{
    stop(id: "HSL:1201110") {
      name
      stoptimesWithoutPatterns {
        scheduledArrival
        realtimeArrival
        arrivalDelay
        scheduledDeparture
        realtimeDeparture
        departureDelay
        timepoint
        realtime
        realtimeState
        pickupType
        dropoffType
        serviceDay
        headsign
        stopSequence
        trip {
          route {
            shortName
            longName         
          }
        }
      }
    }
  }
`;


function calcTime(time: number) {
 let midnight = moment().startOf('day');
return midnight.add(time, 'seconds').format('HH:mm');
}



function calcMinutes(time: number) {
  let midnight = moment().startOf('day');
  let arriving = midnight.add(time, 'seconds').format('HH:mm');
  let now = moment().format('HH:mm');
  let when = moment.duration(moment(arriving, "HH:mm").diff(moment(now, "HH:mm"))).asMinutes();
  if(when > 60) {
    return Math.round(when/60) > 1 ? Math.round(when/60) + " hours" : Math.round(when/60) + " hour";
  } else {
    return Math.round(when) < 1 ? Math.round(when) + "minute" : Math.round(when) + "minutes";
  }
}

function calcDelay(time: number,arriving: number) {
  let when = moment.duration(moment(time, "HH:mm").diff(moment(arriving, "HH:mm"))).asMinutes();
  return when;
}




function Buses() {
    const {data,isSuccess,isLoading} = useGQLQuery('Buses', GET_BUSSES);

  return (
     <div className="buses">
       
         {isSuccess && data.stop.stoptimesWithoutPatterns.map((bus: any, index: number) => (
            <div className="bus" key={index}>
            <div className="left">
                <div className={`${bus.arrivalDelay == '0' ? 'status_line_ok' : 'status_line_ok'}`}></div>
                <svg className="icon" width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.3575 8L16.1075 0.83C15.9708 0.627663 15.7441 0.504544 15.5 0.5H1.25C0.835786 0.5 0.5 0.835786 0.5 1.25V14C0.5 14.4142 0.835786 14.75 1.25 14.75H2.855C3.21005 16.0565 4.39614 16.9633 5.75 16.9633C7.10386 16.9633 8.28995 16.0565 8.645 14.75H13.355C13.71 16.0565 14.8961 16.9633 16.25 16.9633C17.6039 16.9633 18.79 16.0565 19.145 14.75H20.75C21.1642 14.75 21.5 14.4142 21.5 14V8.42C21.4959 8.26884 21.4463 8.12243 21.3575 8ZM14 2H15.1175L18.965 7.25H14V2ZM2 2H12.5V7.25H2V2ZM5.75 15.5C4.92157 15.5 4.25 14.8284 4.25 14C4.25 13.1716 4.92157 12.5 5.75 12.5C6.57843 12.5 7.25 13.1716 7.25 14C7.25 14.8284 6.57843 15.5 5.75 15.5ZM16.25 15.5C15.4216 15.5 14.75 14.8284 14.75 14C14.75 13.1716 15.4216 12.5 16.25 12.5C17.0784 12.5 17.75 13.1716 17.75 14C17.75 14.8284 17.0784 15.5 16.25 15.5ZM20 13.25H19.145C18.79 11.9435 17.6039 11.0367 16.25 11.0367C14.8961 11.0367 13.71 11.9435 13.355 13.25H8.645C8.28995 11.9435 7.10386 11.0367 5.75 11.0367C4.39614 11.0367 3.21005 11.9435 2.855 13.25H2V8.75H20V13.25Z" fill="black"/>
                </svg>                
            </div>
            <div className="right"> 
            <p className="bussInfo">{bus.trip.route.shortName} { bus.arrivalDelay == '0' ? "" : calcDelay(bus.realtimeArrival,bus.scheduledArrival) }</p>
            <p className="bussInfoTime">In {calcMinutes(bus.realtimeArrival)} / {calcTime(bus.scheduledArrival)}</p>
            </div>
        </div>
            ))}
     </div>
  );
}

export default Buses;