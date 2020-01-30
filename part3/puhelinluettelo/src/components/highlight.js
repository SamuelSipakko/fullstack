import React from 'react'

/**
 * Function for highlighting all 'highlightText' matches from 'text'.
 * Highlights only if 'highlightText' is non-empty.
 * @param {string} text Text to search for highlights.
 * @param {string} highlightText Text to highlight.
 * @param {int} idx Value where list 'key'-attribute values should start from.
 * Should be greater or equal to 1. Following function calls are recommended to 
 * use returned index from previos excecution. If left undefined, uses 1 as default.
 * @returns an array of two elements. The first is a collection of JSX
 * elements that include the highlited text and the second the index
 * where next excecution is recommended to start from,
 */
export const highlight = (text, highlightText, idx) => {
    const coll = []
    let count = idx === undefined ? 1 : idx
    let left = text

    const idxCheck = indx => {
        if (indx === -1)
            return left.length
        else
            return indx
    }

    if (highlightText === undefined || highlightText.length === 0)
        return [ [<span key={count}>{text}</span>], count+1 ]

    while (left.length > 0) {
        const idx = left.toLowerCase().search(highlightText.toLowerCase())
        coll.push(<span key={count * 2 - 1}>
                    {left.substring(0, idxCheck(idx))}
                  </span>)
        if (idx !== -1) {
            coll.push(
                <span key={count * 2} style={{ backgroundColor: 'yellow' }}>
                    {left.substr(idx, highlightText.length)}
                </span>)
        }
        left = left.substring(idxCheck(idx) + highlightText.length)
        count += 1
    }
    return [coll, count]
}
