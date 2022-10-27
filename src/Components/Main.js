import { useEffect, useRef, useState } from 'react';
import Scramble from './Scrambles';

const GetData=()=>{
  let list=localStorage.getItem('Time')
  if(list)
    return JSON.parse(list)
  else
    return [];
}

function Main() {

  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  var dvalue=useRef(GetData())
  const [tdata,setTdata]=useState(GetData())
  
  /*eslint-disable */
  useEffect(() => {
    let interval = null;
    if(timerOn)
    {
      setTime(0)
      interval = setInterval(() => {
        setTime((prev) => prev + 10)
      }, 10)
    }
    else
    {
      if(time!==0 && dvalue.current[dvalue.current.length-1]!==time)
      {
        dvalue.current.push(time)
        setTdata(dvalue.current)
      }
      localStorage.setItem('Time',JSON.stringify(dvalue.current))
      clearInterval(interval)
    }
    return ()=>clearInterval(interval);
  }, [timerOn])
  /*eslint-enable */
  
  useEffect(() => {
    window.addEventListener('keyup', DetectKey);
    return ()=>window.removeEventListener('keyup',DetectKey);
  }, [])

  const DetectKey = (e) => {
    if(e.key === " ")
      setTimerOn((x)=>!x)
  }

  useEffect(()=>{
    localStorage.setItem('Time',JSON.stringify(tdata))
    dvalue.current=tdata
  },[tdata])

  return (
    <div>
      <div className='App-header'>
        {!timerOn && (<Scramble/>)}
      </div>
      <div className='Timers'>
        <div id='display'>
          {time>3600000 && (<span>{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:</span>)}
          {time>60000 && (<span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>)}
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>
        <div className='Table'>
            <table>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Time</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {tdata.map((v ,idx)=> ( 
                    <tr key={idx}>
                      <td></td>
                      <td>{("0"+Math.floor((v/60000)%60)).slice(-2)}:{("0"+Math.floor((v/1000)%60)).slice(-2)}:{("0"+((v/10) % 100)).slice(-2)}</td>
                      <td><button onClick={()=>{setTdata(tdata.filter((a,jdx) =>jdx !== idx));}}> Delete </button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
    
  );
}
export default Main;