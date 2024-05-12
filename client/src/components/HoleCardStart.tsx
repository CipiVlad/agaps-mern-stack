import { Link, useLocation } from "react-router-dom"
import { gckHoles, gckAPI } from "../models/gck_holes_api"
import InputFields from "./InputFields"
import LegendExplaination from "./LegendExplaination"
import { useState } from "react"
import { IoChevronBack } from "react-icons/io5";

const HoleCard = () => {
    const { pathname } = useLocation()
    const [show, setShow] = useState(false)
    const { state } = useLocation()
    console.log("From HoleCardStart:", state);


    return (
        <>
            {gckHoles.map((hole: gckAPI, index: number) => {
                return (
                    // render only card mathching the pathname
                    pathname === `/hole-card/${hole.hole}` && (
                        <div key={index}>
                            <h2>Course GCK</h2>
                            <h3>Hole {hole.hole} (Par {hole.par})</h3>
                            <InputFields
                                hole={hole.hole}
                                par={hole.par}
                                link={`/hole-card/${hole.hole + 1}`}
                                state={state}
                            />
                            {
                                hole.hole === 1
                                    ? null
                                    : <Link to={`/hole-card/${hole.hole - 1}`} state={state}>
                                        <IoChevronBack style={{ fontSize: 26 }} />
                                    </Link>
                            }
                        </div>
                    )

                )
            })}
            <button onClick={() => setShow(!show)}>Show Legend</button>
            {
                show ? <LegendExplaination /> : null
            }
        </>
    )
}
export default HoleCard