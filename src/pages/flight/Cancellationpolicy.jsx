import React,{useState} from 'react';
import "./Cancellation.css";
import { Modal, Button } from 'antd';
import { MdFreeCancellation } from "react-icons/md";
import { BsChevronDoubleRight } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";

function Cancellationpolicy({fareRule}) {

    // console.log("fareRulegjffffffffffffffffffffffffffffffffffffffffffffff",fareRule);


    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };


    const extractTableHtml = (html) => {
      const tableRegex = /<table[^>]*>([\s\S]*?)<\/table>/i;
      const match = html.match(tableRegex);
      return match ? match[0] : '';
    };
    
    const extractRowsAfterCancellationFee = (tableHtml) => {
      // console.log("tableHtml", tableHtml);
    
      // Update the regex to match both <td> and <th> tags
      const cellRegex = /<(td|th)[^>]*>([\s\S]*?)<\/\1>/gi;
      
      const cells = tableHtml.match(cellRegex);
      // console.log("cellRegex......................................", cells);
    
      if (!cells) return '';
    
      const cancellationFeeIndex = cells.findIndex(cell => /Cancellation Fee/i.test(cell));
    
      // console.log("cancellationFeeIndex", cancellationFeeIndex);
    
      if (cancellationFeeIndex !== -1 && cancellationFeeIndex + 1 < cells.length) {
        const cellsAfter = cells.slice(cancellationFeeIndex + 1);
        return cellsAfter.join('');
      }
    
      // If "Cancellation Fee" is not found, return the entire table
      return tableHtml;
    };
    
    const extractBeforeDaysHoursAfterInrOrNotAllowed = (cellsHtml) => {
     
      const cellPattern = /<(td|th)[^>]*>([\s\S]*?)<\/\1>/gi;
    
      // console.log("cellPattern////////////////////////////////////////////", cellsHtml);
      const cells = [...cellsHtml.matchAll(cellPattern)];
    
      let result = '<ol>';
      let currentItem = '';
      
      cells.forEach((cellMatch, index) => {
        const fullCell = cellMatch[2].trim(); 
    
        const beforeTimeUnitMatch = fullCell.match(/([\s\S]*?)(\(DAYS\)|\s*DAYS|\s*Days| HOURS | Hours |hrs)/i);
        const inrMatch = fullCell.match(/INR\s*([\d,]+)/i);
        const notAllowedMatch = /Not\s*Allowed/i.test(fullCell);
    
        if (/^(DAYS|Days)/i.test(fullCell)) {
          if (currentItem) {
            result += `<li style="list-style-type:disc;">${currentItem.trim()}</li>`;
            currentItem = '';
          }
          result += `<li style="list-style-type:disc;">${fullCell}</li>`;
        } else if (beforeTimeUnitMatch && (inrMatch || notAllowedMatch)) {
          const beforeTimeUnit = beforeTimeUnitMatch[1].trim();
          const timeUnit = beforeTimeUnitMatch[2].trim();
          // const afterInrOrNotAllowed = inrMatch ? `<b>INR ${inrMatch[1].trim()}</b>` : `<b>notAllowedMatch</b>`;
          // const afterInrOrNotAllowed = inrMatch ? `<strong>INR ${inrMatch[1].trim()}</strong>` : `<strong>${notAllowedMatch}</strong>`;
          const afterInrOrNotAllowed = inrMatch 
          ? `<strong style="color: green;">INR ${inrMatch[1].trim()}</strong>` 
          : `<strong style="color: red;">Not Allowed</strong>`;
  
    
          if (currentItem) {
            result += `<li style="list-style-type:disc; color="green">${currentItem.trim()} ${afterInrOrNotAllowed}</li>`;
            currentItem = '';
          }
          result += `<li style="list-style-type:disc; color:"green">${beforeTimeUnit} ${timeUnit}</li>`;
        } else {
          currentItem += `${fullCell} `;
        }
      });
    
      if (currentItem) {
        result += `<li style="list-style-type:disc;">${currentItem.trim()}</li>`;
      }
    
      result += '</ul>';
      
      return result;
    };
    
   
    const tableHtml = fareRule ? extractTableHtml(fareRule[0]?.FareRuleDetail) : '';
    // console.log("tableHtml", tableHtml);
    const cellsAfterCancellationFeeHtml = extractRowsAfterCancellationFee(tableHtml);
    
    let displayHtml;
    
    if (cellsAfterCancellationFeeHtml) {
      displayHtml = extractBeforeDaysHoursAfterInrOrNotAllowed(cellsAfterCancellationFeeHtml);
    } else {
     
    
      // displayHtml = fareRule[0]?.FareRuleDetail || '';
      displayHtml = fareRule ? fareRule[0]?.FareRuleDetail : '';
    }
    
      
      
      
  return (
   <>
    <div className="col-lg-12 accor_dian mt-4">
   
    <div my={2} className='cancelation-top'>
       <div style={{display:"flex",flexDirection:"row",gap:"12px"}} >
       <div style={{display:"flex",alignItems:"center"}}> <MdFreeCancellation style={{color:"green"}}/> </div> <p style={{fontSize:"18px",fontWeight:"600"}}>Cancellation Fee Details</p></div>
          


 

 <div style={{display:"flex",flexDirection:"row"}}>
 {/* <BsChevronRight style={{color:"green",fontSize:"25px"}}/> */}
    <div
      className="htmlFare"
      dangerouslySetInnerHTML={{ __html: displayHtml }}
    />
 </div>

 {/* <div style={{display:"flex",flexDirection:"row"}}>
 <p style={{fontSize:"12px",color:"blue",cursor:"pointer",display:"flex",alignItems:"center"}}   onClick={showModal}>Know more</p><div><BsChevronDoubleRight style={{fontSize:"12px",color:"blue"}}/></div>
 </div> */}

 {/* <Modal
 width={"700px"}
        title="More Information"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
      
       <div
                                  className="htmlFare"
                                  dangerouslySetInnerHTML={{
                                    __html: fareRule?.[0]?.FareRuleDetail,
                                  }}
                                />
      </Modal> */}

 
  
 
       
  
  </div>
    </div>


  
   </>
  )
}

export default Cancellationpolicy