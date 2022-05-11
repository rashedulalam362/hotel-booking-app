import React, { useState } from 'react'
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { DateRange } from 'react-date-range';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
const Header = ({type}) => {
  const [destination,setDestination] = useState('');
  const [openDate, setOpenDate]= useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const[openOption, setOpenOption]= useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room:1
  })
 
  const navigate=useNavigate();

  const handleOption=(name, operation)=>{
    setOptions((prev)=>{
      return{
        ...prev,
        [name]:operation === 'i'? prev[name]+1: prev[name]-1
      }
    })
  }
  const handleSearch=()=>{
    navigate("/hotels", { state: { destination, date, options } });
  }
  return (
    <div className="header">
       <div className={type === 'list' ? "header-container listMode" : "header-container" }>
         <div className="header-list">
           <div className="header-items active">
           <FontAwesomeIcon icon={faBed}  />
            <span>Stays</span> 
               </div>
               <div className="header-items">
               <FontAwesomeIcon icon={faPlane} />
                 <span>Flights</span>
               </div>
               <div className="header-items">
               <FontAwesomeIcon icon={faCar} />
                <span>Car rentals</span> 
               </div>
               <div className="header-items">
               <FontAwesomeIcon icon={faBed} /> 
              <span>Stays</span> 
               </div>
               <div className="header-items">
               <FontAwesomeIcon icon={faBed} />
                <span>Attractions</span> 
               </div>
               <div className="header-items">
               <FontAwesomeIcon icon={faTaxi} />
               <span>Airport taxis</span>
               </div>  
            </div> 
            { type !== 'list' && 
            <>
            <h1 className="header-title">
             A lifetime of discounts? It's Genius.
          </h1>
          <p className="headerDes">
            Get rewarded for your travels  unlock instant savings of 10% or
              more with a free Lamabooking account   
            </p>
            <button className="headerBtn">Sign in / Register</button> 
             <div className="header-search">
                 <div className="headerSearchItem">
                     <FontAwesomeIcon icon={faBed} 
                      className="headerIcon" />
                      <input type="text"
                      onChange={(e)=>setDestination(e.target.value)}
                      className="headerSearchInput"
                    placeholder="Where do you want to go?"/>
                 </div>
                 <div className="headerSearchItem">
                     <FontAwesomeIcon icon={faCalendar} 
                     
                      className="headerIcon" />
                      <span onClick={()=>setOpenDate(!openDate)} className="headerSearchText">{`${format(date[0].startDate, "MM/dd/yyy")} 
                      to ${format(date[0].endDate, "MM/dd/yyy")} ` } 
                      </span>
                      {openDate && <DateRange
                      editableDateInputs={true}
                      onChange={item => setDate([item.selection])}
                      minDate={new Date()}
                      moveRangeOnFirstSelection={false}
                      ranges={date}
                      className='date'
                      />}
                       
                 </div>
                 <div className="headerSearchItem">
                     <FontAwesomeIcon icon={faPerson} 
                      className="headerIcon"/>
                       <span onClick={()=>setOpenOption(!openOption)} className="headerSearchText">{`${options.adult} adult · ${options.children} children · ${options.room} room`}
                        </span>
                       {openOption && <div className="options">
                          <div className="optionsItem">
                          
                              <span  className="opttionsText">Adults</span>
                              <div className="optionCounter">
                              <button disabled={options.adult <=1} className="optionCounterButton" onClick={()=>handleOption("adult","d")}>-</button>
                              <span className="optionCounterNumber">1</span>
                              <button className="optionCounterButton" onClick={()=>handleOption("adult","i")}>+</button>
                              </div>        
                              
                              </div>
                              <div className="optionsItem">
                           
                              <span  className="opttionsText" >Children</span>
                              <div className="optionCounter">
                              <button  disabled={options.children <= 0} className="optionCounterButton" onClick={()=>handleOption("children","d")}>-</button>
                              <span className="optionCounterNumber">0</span>
                              <button className="optionCounterButton" onClick={()=>handleOption("children","i")} >+</button>
                              </div>     
                              
                              </div>
                              <div className="optionsItem">
                              <span className="opttionsText" >Rooms</span>
                              <div className="optionCounter">
                              <button  disabled={options.room <= 1} className="optionCounterButton" onClick={()=>handleOption("room","d")}>-</button>
                              <span className="optionCounterNumber">1</span>
                              <button className="optionCounterButton" onClick={()=>handleOption("room","i")}>+</button>
                              </div>
                               
                               </div>
                                </div>}
                                </div>
                                <div className="headerSearchItem">
                                  <button className="headerBtn" onClick={handleSearch}>Search</button>
                                    </div>
                       
                                  </div>
                                  </>
                                  }
                
                
                                </div> 
                              
                        </div>
  )
}

export default Header