import React from 'react'
import './topDown.css'

export const TopDownList = (list: any) => {
    let downList = list.list

    const selElem = (e: any) => {
        list.selectElem({value: e.target.innerText, id: e.target.id})
        if (list.setRef) {
            if (list.setRef.current) {
                if (list.setRef.current.style.display === 'block') {
                    list.setRef.current.style.display = 'none'
                } else {    
                    list.setRef.current.style.display = 'block'
                }
                
            }
        }
    }
    
  return (
    <ul ref={list.setRef}>
        {downList?.map((elem: any) => (
            <li key={!Array.isArray(downList[0]) ? elem.id : elem} id={!Array.isArray(downList[0]) ? elem.id : ''} onClick={selElem}>{!Array.isArray(downList[0]) ? elem.name : elem}</li>
        ))}
    </ul>
  )
}
