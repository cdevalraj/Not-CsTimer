import { useEffect, useState } from 'react';
import * as Scrambler from 'sr-scrambler'

export default function Scramble() {
    const [c, setC] = useState("3x3x3")
    const [scram, setScram] = useState(Scrambler.cube(3,14))
    useEffect(() => {
        switch (c) {
            case "3x3x3":
                setScram(Scrambler.cube(3,14))
                break;
            case "2x2x2":
                setScram(Scrambler.cube(2,14))
                break;
            case "4x4x4":
                setScram(Scrambler.cube(4,14))
                break;
            case "5x5x5":
                setScram(Scrambler.cube(5,14))
                break;
            case "Skewb":
                setScram(Scrambler.skewb(14))
                break;
            case "Pyraminx":
                setScram(Scrambler.pyraminx(14))
                break;
            case "Megaminx":
                setScram(Scrambler.megaminx(14))
                break;
            case "Square1":
                setScram(Scrambler.square1(14))
                break;
            default:
                break;
        }
    }, [c])

    return (
        <div className='options'>
            <select onChange={(e) => {
                let seletedCube = e.target.value;
                setC(seletedCube)
            }}>
                <option value="3x3x3">3x3x3</option>
                <option value="2x2x2">2x2x2</option>
                <option value="4x4x4">4x4x4</option>
                <option value="5x5x5">5x5x5</option>
                <option value="Skewb">Skewb</option>
                <option value="Pyraminx">Pyraminx</option>
                <option value="Megaminx">Megaminx</option>
                <option value="Square1">Square1</option>
            </select>
            <div className='Scram'>
                {scram}
            </div>
        </div>
    );
}