import { createFilterOptions } from '@mui/material'
import React, { useEffect, useState } from 'react'
import keys from '../constants/KeyData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import 'animate.css'

const colors = ['red', 'blue', 'lime', 'purple', 'yellow', 'orange', 'cyan', 'aqua', 'crimson', 'royalblue']
function ButtonCreator() {

    const [led, setLed] = useState('')
    const [power, setPower] = useState(false)
    const [status, setStatus] = useState(false)
    const [curr, setCurr] = useState({})
    const [int, setInt] = useState(null)
    const [exp, setExp] = useState('🙈')
    const [error, setError] = useState('')
    const [hover, setHover] = useState(false)

    useEffect(() => {
        /**
         * @desc DidMount
         */

        setLed('black')
    }, [])

    useEffect(() => {
        /**
         * @desc Turning off calc on power : false
         */

        if (!power) {
            setTimeout(() => {
                setLed('black')
            }, 2000);
        }
    }, [power])

    useEffect(() => {
        /**
         * @desc evaluation on keyPress and power ON
         */
        if (power) {
            let ans = ''
            try {
                switch (curr.val) {
                    case 'AC':
                        ans = '👀'
                        break
                    case '=':
                        let data = ""
                        for (let i = 0; i < keys[18]['key'].length; i++) {
                            let prev = ""
                            while (keys[18]['key'].charAt(i) !== '+' && keys[18]['key'].charAt(i) !== '-' && keys[18]['key'].charAt(i) !== '*' && keys[18]['key'].charAt(i) !== '/' && i < keys[18]['key'].length) {
                                prev += keys[18]['key'].charAt(i);
                                i++;
                            }
                            data += parseFloat(prev, 10) + keys[18]['key'].charAt(i)
                        }
                        ans = eval(data)
                        break
                    default:
                        ans = keys[18]['key'] === '👀' ? curr.val : keys[18]['key'] + "" + curr.val

                }
            } catch (error) {
                setError(error.message)
                setTimeout(() => {
                    setError('')
                }, 2000);
                ans = 0
            }

            keys[18]['key'] = isNaN(ans) || curr.val !== '=' ? ans : parseFloat(ans.toFixed(3))
            setExp(ans)
        }

    }, [curr])

    function handleClick(e, key) {

        if (key === '⚡' && !power) {
            setPower(true)
            setStatus('Turning Power On! Enjoy the fireworks! 🎆')
            setTimeout(() => {
                keys[18]['key'] = '👀'
                setStatus('')
            }, 2000)
            let interval = setInterval(() => {
                let idx = Math.floor(Math.random() * (9))
                setLed(colors[idx] ?? 'black')
            }, 2000);
            setInt(interval)
            return
        } else if (key === '⚡') {
            setPower(false)
            setStatus('Turning Power Off! Save Battery! 🔋')
            setTimeout(() => {
                setStatus('')
                keys[18]['key'] = '🙈'
            }, 2000)
            clearInterval(int)
            return
        }

        if (power) {
            setCurr({ val: key })
        }
    }

    const handleMouseEnter = (e, idx) => {
        e.target.style['cursor'] = 'pointer'
        if (idx !== 18) {
            // e.target.style['background-color'] = 'lightskyblue';
            e.target.style['border-radius'] = '10px';
            e.target.style['height'] = '43px';
            e.target.style['width'] = `${parseInt(e.target.style['width'].split('px')[0]) - 4}px`;
            e.target.style['bottom'] = `${parseInt(e.target.style['bottom'].split('px')[0]) + 4}px`
            e.target.style['left'] = `${parseInt(e.target.style['left'].split('px')[0]) + 2}px`
        }
    }

    const handleME = (e, idx) => {
        e.target.style['cursor'] = 'pointer'
        if (idx !== 18) {
            e.target.style['background-color'] = 'lightskyblue'
        }
    }

    const handleML = (e, idx) => {
        e.target.style['cursor'] = 'pointer'
        if (idx !== 18) {
            e.target.style['background-color'] = keys[idx]['color'];
        }
    }

    const handleLeave = (e, idx) => {
        e.target.style['height'] = '50px';
        if (idx !== 18) {
            e.target.style['border-radius'] = '6px';
            e.target.style['width'] = `${parseInt(e.target.style['width'].split('px')[0]) + 4}px`;
            e.target.style['bottom'] = `${parseInt(e.target.style['bottom'].split('px')[0]) - 4}px`
            e.target.style['left'] = `${parseInt(e.target.style['left'].split('px')[0]) - 2}px`
        }
    }

    return (
        <>
            <div style={{ border: '1px solid black', margin: '30px auto', backgroundColor: 'grey', height: '301px', width: '303px', position: 'relative' }}>
                {
                    keys.map(({ key, height, width, left, bottom, idx, color }) => (
                        <div
                            draggable={false}
                            key={idx}
                            style={{ fontWeight: 'bold', borderRadius: '6px', boxShadow: `1px 1px 2px 2px ${led}`, border: '2px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', height: `${height}px`, width: `${width}px`, position: 'absolute', left: `${left}px`, bottom: `${bottom}px`, backgroundColor: color }}
                            onClick={(e) => handleClick(e, key, idx)}
                            onMouseOver={(e) => handleME(e, idx)}
                            onMouseDown={(e) => handleMouseEnter(e, idx)}
                            onMouseUp={(e) => handleLeave(e, idx)}
                            onMouseOut={(e) => handleML(e, idx)}
                        >{key === 'DISPLAY' ? exp : key}
                        </div>
                    ))

                }
            </div>
            <div style={{ height: 50, fontWeight: 'bold', fontSize: '20px' }}>
                {
                    status
                }
            </div>
            <div style={{ height: 50, fontWeight: 'bold', fontSize: '20px' }}>
                {
                    error
                }
            </div>
            <div
                style={{ paddingTop: '10px', fontWeight: 'bold', fontSize: '20px' }}>
                <span style={{color:'purple', fontFamily:'merriweather'}}>S</span><a target='_blank' href="https://github.com/vancityraichandani">
                    <FontAwesomeIcon
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        className={hover ? 'animate__animated animate__headShake' : ''} icon={faGithub}></FontAwesomeIcon>
                    </a><span style={{color:'purple', fontFamily:'merriweather'}}>MESH RAI</span><span style={{color:'purple', fontFamily:'merriweather'}}>CHANDANI</span>
            </div>
        </>
    )
}

export default ButtonCreator
