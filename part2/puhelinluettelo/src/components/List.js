import React from 'react'
import { highlight } from './highlight'
import Button from './Button';


const tdStyle = {
    padding: '5px 20px 5px 0px'
    }


const List = ({list,filt,showTable,deletePerson}) => {
    const rows = 
        list.filter(v=> v.name.toLowerCase().includes(filt.toLowerCase())
                        || v.number.includes(filt))
            .map((p,i)=> {
                if(showTable) {
                    return (
                      <tr key={i}>
                        <td style={tdStyle}>{highlight(p.name,filt,1)[0]}</td>
                        <td style={tdStyle}>{highlight(p.number,filt,1)[0]}</td>
                        <td style={tdStyle}>
                            <Button handle={deletePerson(p)} text='delete'/>
                        </td>
                      </tr>
                    )
                }
                const [ names, idx ] = highlight(p.name,filt,3)
                const row = names.concat(<span key='0'>&nbsp;&nbsp;&nbsp;&nbsp;</span>)
                                 .concat(highlight(p.number,filt,idx)[0])
                                 .concat(<span key='1'>&nbsp;&nbsp;&nbsp;&nbsp;</span>)
                                 .concat(<Button key={2} handle={deletePerson(p)} text='delete'/>)
                return <tr key={i*2-1}>
                          <td key={i*2} style={tdStyle}>{row}</td>
                       </tr>
            })
    return <table><tbody>{rows}</tbody></table>
}

export default List