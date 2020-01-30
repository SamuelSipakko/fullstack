import React from 'react'

/**
 * Function for highlighting all 'highlightText' matches from 'text'.
 * @param {string} text Text to search for highlights.
 * @param {string} highlightText Text to highlight.
 * @returns a collection of JSX elements that include the highlited text
 */
export const highlight = (text, highlightText) => {
    if (highlightText === undefined || highlightText.length === 0)
        return <span>{text}</span>

    const coll = []
    let count = 1
    let left = text
    const idxCheck = indx => {
        if (indx === -1)
            return left.length
        else
            return indx
    }
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
    return coll
}
